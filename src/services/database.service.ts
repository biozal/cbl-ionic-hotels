import {
  Database,
  FileSystem,
  DatabaseConfiguration,
  Collection,
  MutableDocument,
  LogDomain,
  LogLevel,
} from "cblite";

import { Hotel } from "../models/hotel";

export class DatabaseService {
  private database: Database;
  private collection: Collection;
  private DOC_TYPE_HOTEL = "hotel";
  private DOC_TYPE_BOOKMARKED_HOTELS = "bookmarked_hotels";
  private bookmarkDocument: MutableDocument;

  constructor() {}

  public async getHotels(): Promise<Hotel[]> {
    await this.initializeDatabase();
    return await this.retrieveHotelList();
  }

  private async initializeDatabase() {
    await this.seedInitialData();

    this.bookmarkDocument = await this.findOrCreateBookmarkDocument();
  }

  public async seedInitialData() {
    /* ** 
    * Note about encryption: In a real-world app, the encryption key    
    * should not be hardcoded like it is here. 
    
    * One strategy is to auto generate a unique encryption key per 
    * user on initial app load, then store it securely in the 
    * device's keychain for later retrieval.
     
    * Ionic's Identity Vault (https://ionic.io/docs/identity-vault) 
    * plugin is an option. Using IV’s storage API, you can ensure 
    * that the key cannot be read or accessed without the user being 
    * authenticated first. 
    * **/

    //need to guarentee we can write to the file system
    try {

      //added code to get proper path to save database per platform
      const fileSystem = new FileSystem();
      const directoryPath = await fileSystem.getDefaultPath();

      const dc = new DatabaseConfiguration();
      dc.setDirectory(directoryPath);
      dc.setEncryptionKey("8e31f8f6-60bd-482a-9c70-69855dd02c39");

      this.database = new Database("travel", dc);

      //turned on database logging to verbose to see information in IDE
      this.database.setLogLevel(LogDomain.ALL, LogLevel.VERBOSE);

      await this.database.open();
      //added collection since we save to collections now, not the database
      //for simplicity, we are using the default collection which is
      //the scope: _default and collection: _default
      this.collection = await this.database.defaultCollection();

      const len = (await this.getAllHotels()).length;
      if (len === 0) {
        const hotelFile = await import("../data/hotels");

        for (let hotel of hotelFile.hotelData) {
          let doc = new MutableDocument();
          doc.setNumber("id", hotel.id);
          doc.setString("name", hotel.name);
          doc.setString("address", hotel.address);
          doc.setString("phone", hotel.phone);
          doc.setString("type", this.DOC_TYPE_HOTEL);

          //this.database.save(doc);   
          //we save documents to collections now and this is an async operation
          await this.collection.save(doc);
        }
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  private async retrieveHotelList(): Promise<Hotel[]> {
    // Get all hotels
    const hotelResults = await this.getAllHotels();

    // Get all bookmarked hotels
    let bookmarks = this.bookmarkDocument.getArray("hotels") as number[];

    let hotelList: Hotel[] = [];
    for (let key in hotelResults) {
      // Couchbase can query multiple databases at once, so "_" is just this single database.
      // [ { "_": { id: "1", name: "Matt" } }, { "_": { id: "2", name: "Max" } }]

      //using collection name now, so need to look for the documents using that
      let singleHotel = hotelResults[key]["_default"] as Hotel;
      //let singleHotel = hotelResults[key]["_"] as Hotel;

      // Set bookmark status
      singleHotel.bookmarked = bookmarks.includes(singleHotel.id);
      hotelList.push(singleHotel);
    }

    return hotelList;
  }

  public async searchHotels(name: String): Promise<Hotel[]> {
    //you can still use _ for the collection name it it should default to
    // _default._default, but it is better to be explicit
    const query = this.database.createQuery(
      `SELECT * FROM _ WHERE name LIKE '%${name}%' AND type = '${this.DOC_TYPE_HOTEL}' ORDER BY name`
    );
    const results = await query.execute();
    //const results = await (await query.execute()).allResults(); - we don't need double awaits in new framework

    let filteredHotels: Hotel[] = [];
    for (const key in results) {
      //for (var key in results) {
      let singleHotel = results[key]["_"] as Hotel;

      filteredHotels.push(singleHotel);
    }

    return filteredHotels;
  }

  public async bookmarkHotel(hotelId: number) {
    let hotelArray = this.bookmarkDocument.getArray("hotels") as number[];
    hotelArray.push(hotelId);
    this.bookmarkDocument.setArray("hotels", hotelArray);

    //we use collections to save documents now
    await this.collection.save(this.bookmarkDocument);
    //this.database.save(this.bookmarkDocument);
  }

  // Remove bookmarked hotel from bookmark document
  public async unbookmarkHotel(hotelId: number) {
    let hotelArray = this.bookmarkDocument.getValue("hotels") as number[];
    hotelArray = hotelArray.filter((id) => id !== hotelId);
    this.bookmarkDocument.setArray("hotels", hotelArray);

    await this.collection.save(this.bookmarkDocument);
    //this.database.save(this.bookmarkDocument);
  }

  private async findOrCreateBookmarkDocument(): Promise<MutableDocument> {
    // Meta().id is a GUID like e15d1aa2-9be3-4e02-92d8-82bd9d05d8e3
    const bookmarkQuery = this.database.createQuery(
      `SELECT META().id AS id FROM _default._default WHERE type = '${this.DOC_TYPE_BOOKMARKED_HOTELS}'`
    );
    const resultSet = await bookmarkQuery.execute();

    // ** developers don't need to execute twice to get results
    //const resultSet = await bookmarkQuery.execute();
    //const resultList = await resultSet.allResults();

    let mutableDocument: MutableDocument;
    if (resultSet.length === 0) {
      mutableDocument = new MutableDocument()
        .setString("type", this.DOC_TYPE_BOOKMARKED_HOTELS)
        .setArray("hotels", new Array());
      await this.collection.save(mutableDocument);
      //this.database.save(mutableDocument);
    } else {
      const docId = resultSet[0]["id"];

      //we get documents directly from collections now
      const doc = await this.collection.document(docId);
      //const doc = await this.database.getDocument(docId);
      mutableDocument = MutableDocument.fromDocument(doc);
    }

    return mutableDocument;
  }

  private async getAllHotels() {
    //updated the query to use the proper scope and collection name
    const query = this.database.createQuery(
      `SELECT * FROM _default._default WHERE type = '${this.DOC_TYPE_HOTEL}' ORDER BY name`
    );
    //const query = this.database.createQuery(
    //  `SELECT * FROM _ WHERE type = '${this.DOC_TYPE_HOTEL}' ORDER BY name`
    //);
    return await query.execute();
  }
}

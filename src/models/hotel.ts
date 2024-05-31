export class Hotel {
  constructor(
    public name: string,
    public address: string,
    public phone: string,
    public id?: number,
    public bookmarked: boolean = false){
  }

}

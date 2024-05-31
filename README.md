# Couchbase Lite Hotels Demo App
In spirit of the original demo app for the "Build Offline-Enabled Mobile Apps With Ionic and Couchbase Lite" talk at Couchbase Connect 2021, this app allows users to search and bookmark hotels using data loaded from a Couchbase Lite database.

You can find the original demo app [here](https://github.com/ionic-team/demo-couchbaselite-hotels)

Updated for modern React and the new Couchbase Lite integration in Ionic. 

## Features

* Data from a Couchbase Lite database: The database is embedded into the Android and iOS apps.

* UI components powered by Ionic Framework: search bar, bookmarks, icons, list items, and more.

* Bookmarked hotels: Saved in a Couchbase Lite database.

* Cross-platform: Create iOS and Androids apps all from the same codebase with standard web technologies.

## Tech Details

- UI: [Ionic Framework 7](https://ionicframework.com) and [React 18](https://react.dev/)
- Native runtime: [Capacitor 5](https://capacitorjs.com)
- Database: Couchbase Lite v3.x powered by [Couchbase Lite integration](https://cbl-ionic.dev/)

## Development Requirements
- Javascript
    - [Node 18](https://formulae.brew.sh/formula/node@18)
- Capacitor
    - [Capacitor v5 cli](https://capacitorjs.com/docs/getting-started)
    - [Understanding on Capacitor Plugins Development](https://capacitorjs.com/docs/plugins/creating-plugins)
- IDEs
    - [Visual Studio Code](https://code.visualstudio.com/download)
        - [Visual Studio Code Ionic Extension](https://capacitorjs.com/docs/vscode/getting-started)
    - [IntelliJ IDEA](https://www.jetbrains.com/idea/download/)
- iOS Development
    - A modern Mac 
    - [XCode 14](https://developer.apple.com/xcode/) or higher installed and working (XCode 15 installed is preferred)
    - [XCode Command Line Tools](https://developer.apple.com/download/more/) installed 
    - [Simulators](https://developer.apple.com/documentation/safari-developer-tools/installing-xcode-and-simulators) downloaded and working
    - [Homebrew](https://brew.sh/) 
    - [Cocopods](https://formulae.brew.sh/formula/cocoapods)
   
    - A valid Apple Developer account and certificates installed and working
- Android Development
    - [Android Studio](https://developer.android.com/studio?gad_source=1&gclid=CjwKCAjwzN-vBhAkEiwAYiO7oALYfxbMYW_zkuYoacS9TX16aItdvLYe6GB7_j1QwvXBjFDRkawfUBoComcQAvD_BwE&gclsrc=aw.ds) installed and working
    - Android SDK 34 >= installed and working (with command line tools)
    - A Android Emulator downloaded and working 

## How to Run

Note: Installing and running this app, which uses Couchbase Lite Enterprise edition , which requires a license. 

- Install the Ionic CLI: `npm install -g @ionic/cli`

### Setup cbl-ionic plugin

- Clone the following repos into the same folder
	- This repository
	- https://github.com/Couchbase-Ecosystem/cblite-js
	- https://github.com/Couchbase-Ecosystem/cbl-js-swift/
	- https://github.com/Couchbase-Ecosystem/cbl-ionic
- Setup cblite-js by installing dependencies for both the cblite and cblite-tests npm packages.  Run the following commands from the root of the cblite-js repo:
    ```shell
    cd cblite-js
    cd cblite
    npm install
    npm run build
    cd ../cblite-tests
    npm install
    npm run build
    cd ../..
    ```
- Install the dependencies on cbl-ionic plugin

    ```shell
    cd cbl-ionic
    npm install
    ```
- Install SwiftLint if you're on macOS.

    ```shell
    brew install swiftlint
    ```	
- Install CocoaPods for cbl-ionic plugin 
    ```shell
    cd ios
    pod install 
    cd ..
	```

- Run npm build to build Javascript - from project root.
    ```shell
    npm run build
    npm run verify
    ```
### Setup the demo app
- change directory into the cbl-ionic-hotels (this repo)

- Install the dependencies: 
	```shell
	npm install
	```
- Install Cocoapods into iOS 
   ```shell
    cd ios
	cd App
    pod install 
    cd ../..
	```
- Build the app:
```shell 
	npm build
 ```
- Run the app on your device. Either `ionic capacitor run ios --livereload external` or `ionic capacitor run android --livereload external` depending on the platform you want to run the app on.
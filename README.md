
# Directory Watch

Utiltiy to monitor a directory for any addition of new files or deletion of new file.


# API

 - Fetch DirectoryWatch
 - Fetch Global Constant
 - Update Global Constant

# Installation
* Execute the following command from the project directory
```
    > npm install
```
* DirectoryWatch uses light weight document based database (neDB). Hence no installation is required fro database. 
# API  Schema

#### Fetch DirectoryWatch
Method : GET 
URL : http://ENDPOINT/Watch
Params: magicString, directory

### Fetch Global Constant
Method : GET 
URL : http://ENDPOINT/constants

### Update Global Constant
Method : PUT 
URL : http://ENDPOINT/constants
Content-type: Application/Json
```json
{
    "magicString": "123",
    "directory":"/Users/tharun/Desktop/Interview/DirectoryWatch/utils/DirectoryWatch"
}
```

# Database Schema Design

### 1. Global Constant
```json
{
        "type": ""String",
        "directory": "String",
        "magicString": "String",
        "lastrun": "String",
        "lastUpdated": Number,
        "lastModifiedTime": "String",
        "_id": "String",
        "frequency": Number
    }
```

### 2. Directory Watch
```json
 {
        "directory": "String",
        "magicString": "String",
        "timeStamp": Number,
        "addedFiles": "Array",
        "deleteFiled": [],
        "currentFiles": [],
        "magicStringcount": Number,
        "status": "String",
        "type": "String",
        "_id": "String"
    }
```


# Known Issues
* Decided to go with light weight database nedb was a mistake, the data read and writes are inconsistent.
* Some cases the the write take more than 10 min. Due to time constraint couldn't perfrom end to end testing.









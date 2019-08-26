const path = require('path');
const fs = require('fs');

// a modul egy oszrállyal tér vissza, ami az adatbázis fileokat kezeli.
module.exports = class DB {
  // A construktor megkapj a json file nevét.
  constructor(jsonFileName) {
    // Beállítjuk a json fájlokat tartalmazó mappa elérési útját.
    this.jsonDirectory = path.join('./../json');
    // beállítjuk a json fájl teljes elérési útját.
    this.jsonFilePath = path.join(this.jsonDirectory, `${jsonFileName}.json`);
    console.log(this.jsonFilePath);
  }

  find(id = 0) {
    return new Promise((resolve, reject) => {
      if (id === 0) {
        this.getJsonArray().then(
          dataArray => resolve(dataArray),
          err => reject(err),
        );
      } else {
        this.getJsonArray().then(
          (dataArray) => {
            const found = dataArray.filter(item => item.id == id)[0] || {};
            resolve(found);
          },
        );
      }
    });
  }

  getJsonArray() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.jsonFilePath, 'utf8', (err, jsonString) => {
        if (err) {
          return reject(err);
        }
        resolve(JSON.parse(jsonString));
      });
    });
  }
};

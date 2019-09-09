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

  saveNew(order) {
    return new Promise((res, rej) => {
      this.getJsonArray().then(
        (dataArray) => {
          this.getMaxId().then(
            (maxId) => {
              const newOrder = order;
              newOrder.id = maxId + 1;
              dataArray.push(newOrder);
              const string = JSON.stringify(dataArray);
              this.writeJsonArray(string);
              res();
            },
          );
        },
      );
    });
  }

  delete(id) {
    return new Promise((res, rej) => {
      this.getJsonArray().then(
        (dataArray) => {
          const ids = dataArray.map(item => item.id)
          const index = ids.indexOf(parseInt(id));
          console.log(index);
          dataArray.splice(index, 1);
          const string = JSON.stringify(dataArray);
          this.writeJsonArray(string);
          res();
        },
      );
    });
  }

  edit(order) {
    return new Promise((res, rej) => {
      this.getJsonArray().then(
        (dataArray) => {
          const index = dataArray.map(item => item.id).indexOf(order.id);
          dataArray[index] = order;
          const string = JSON.stringify(dataArray);
          this.writeJsonArray(string);
          res();
        },
      );
    });
  }

  getMaxId() {
    return new Promise((res, rej) => {
      this.getJsonArray().then(
        (dataArray) => {
          const ids = dataArray.map(item => item.id);
          let maxId = Math.max(...ids);

          if (maxId == null) {
            maxId = 0;
          }

          res(maxId);
        },
      );
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

  writeJsonArray(data) {
    fs.writeFile(this.jsonFilePath, data, 'utf8', (err) => {});
  }
};

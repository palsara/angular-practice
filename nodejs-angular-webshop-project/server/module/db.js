const path = require('path');
const fs = require('fs');

// a modul egy oszrállyal tér vissza, ami az adatbázis fileokat kezeli.
module.exports = class DB {
  // A construktor megkapj a json file nevét.
  constructor(jsonFileName) {
    // Beállítjuk a json fájlokat tartalmazó mappa elérési útját.
    this.jsonDirectory = path.join('./../json');
    // Beállítjuk a json fájl teljes elérési útját.
    this.jsonFilePath = path.join(this.jsonDirectory, `${jsonFileName}.json`);
    console.log(this.jsonFilePath);
  }

  find(id = 0, query = '') {
    return new Promise((resolve, reject) => {
      // Az összeset adja vissza, ha az id 0
      if (id === 0) {
        this.getJsonArray().then(
          (dataArray) => {
            if (query) {
              const queryParams = query.split('=');
              dataArray = dataArray.filter(item => item[queryParams[0]] == queryParams[1]);
            }
            resolve(dataArray);
          },
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

  async create(item) {
    // Beolvassuk a json filet
    const dataArray = await this.getJsonArray(); // ha valami Promise-t ad vissza, elé lehet írni, hogy await
    // Visszaadja a tömböt, vagy hibát
    // A kapott tömbből készítünk egy id-t, beállítjuk a kapott id-t az elemre
    item.id = this.getNextId(dataArray);
    // Bepusholjuk az elemet a tömbbe
    dataArray.push(item);
    // Visszaírjuk a file-ba a módosult tömböt
    await this.write(dataArray);
    return item;
  }

  // A teljes file tartalmát vissza adja egy tömbben
  getJsonArray() {
    return new Promise((resolve, reject) => {
      // Beolvassa a jsonStringet
      fs.readFile(this.jsonFilePath, 'utf8', (err, jsonString) => {
        if (err) {
          return reject(err);
        }
        // Parse-olva visszaadja a jsonStringet
        resolve(JSON.parse(jsonString));
      });
    });
  }

  write(dataArray) {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify(dataArray);
      fs.writeFileSync(this.jsonFilePath, data, 'utf8', (err) => {
        if (err) {
          reject({
            type: 'Write error',
            error: err,
          });
        }
        resolve();
      });
    });
  }

  getNextId(dataArray) {
    if (!Array.isArray(dataArray)) {
      return 1;
    }
    if (dataArray.length === 0) {
      return 1;
    }
    dataArray.sort((a, b) => a.id - b.id);
    return dataArray[dataArray.length - 1].id + 1;
  }
};

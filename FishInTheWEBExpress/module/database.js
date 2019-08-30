const path = require('path');
const fs = require('fs');
const FsUtil = require('./fsUtil');
// a modul egy oszrállyal tér vissza, ami az adatbázis fileokat kezeli.
module.exports = class DB {
  // A construktor megkapj a json file nevét.
  constructor(jsonFileName) {
    // Beállítjuk a json fájlokat tartalmazó mappa elérési útját.
    this.jsonDirectory = path.join(__dirname, './../public/json');
    // beállítjuk a json fájl teljes elérési útját.
    this.jsonFilePath = path.join(this.jsonDirectory, `${jsonFileName}.json`);
    console.log(this.jsonFilePath);
  }

  async find(id = 0, query = '') {
    const dataArray = await this.getJsonArray();
    if (id == 0) {
      return await this.filterByQueryParams(dataArray, query);
    }
    return dataArray.filter(item => item.id == id)[0] || {};
  }

  filterByQueryParams(arr, query) {
    return new Promise((resolve, reject) => {
      if (query) {
        const queryParams = query.split('=');
        const filtered = arr.filter(item => item[queryParams[0]] == decodeURI(queryParams[1]));
        resolve(filtered);
      }
      resolve(arr);
    });
  }

  async update(id, obj) {
    // Lekérni az összes adatot a json fájlból (this.getJsonArray)
    const dataArray = await this.getJsonArray();

    if (obj.id !== id) {
      throw new Error(`Object id isn't met with url parameter. ${id} !== ${obj.id}`);
    }

    // Megkeresni melyiknek az id-je azonos a paraméterben kapott id-vel.
    // Kicsrélni a megtalált objektumot a paraméterben kapottal.
    for (let i = 0; i < dataArray.length; i += 1) {
      if (dataArray[i].id === id) {
        dataArray[i] = obj;
        break;
      }
    }

    // Visszaírni az adtokat a fájlba (this.write)
    await this.write(dataArray);
    return obj;
  }

  async create(item) {
    const dataArray = await this.getJsonArray();
    item.id = this.getNextId(dataArray);
    dataArray.push(item);
    await this.write(dataArray);
    return item;
  }

  async getJsonArray() {
    const data = await FsUtil.readFile(this.jsonFilePath);
    return JSON.parse(data);
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

  async write(dataArray) {
    const data = JSON.stringify(dataArray, null, 4);
    await FsUtil.writeFile(this.jsonFilePath, data);
  }


  async delete(id) {
    // Lekérni az összes adatot a json fájlból (this.getJsonArray)
    const dataArray = await this.getJsonArray();

    // Megkeresni melyiknek az id-je azonos a paraméterben kapott id-vel.
    // Kicsrélni a megtalált objektumot a paraméterben kapottal.
    for (let i = 0; i < dataArray.length; i += 1) {
      if (dataArray[i].id == id) {
        dataArray.splice(i, 1);
        break;
      }
    }

    // Visszaírni az adtokat a fájlba (this.write)
    await this.write(dataArray);
    return id;
  }
};

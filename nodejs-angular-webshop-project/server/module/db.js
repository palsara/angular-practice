const path = require('path');
const fs = require('fs');
const FsUtil = require('./fsUtil');
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

  async find(id = 0, query = '') {
    let dataArray = await this.getJsonArray();
    if (id == 0) {
      return await this.filterByQueryParams(dataArray, query)
    } else {
      return dataArray.filter(item => item.id == id)[0] || {};)
  }
}

filterByQueryParams(arr, query) {
  return new Promise((res, rej) => {
    if (query) {
      let queryParams = query.split('=');
      let filtered = arr.filter(item => item[queryParams[0]] == decodeURI(queryParams[1]));
      res(filtered)
    }
    res(arr)
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
}
/**
 * Updates an object in the database file.
 * @param {number} id id of the object, which will be updated 
 * @param {Object} obj object, which will replace the exsisting one 
 */
async update(id, obj) {
  //Lekérjük az összes adatot a jsonfile-ból
 let dataArray = await this.getJsonArray();

 if(obj.id!==id){
   throw new Error(`Object id is not the same as the url parameter.`)
 }
  //Megkeressük, melyiknek az id-je azonos a kapott id-vel
  for (let i = 0; i < dataArray.length; i += 1) {
    if (dataArray[i].id == id) {
      //Kicseréljük a megtalált objektumot a paraméterben kapottal
      dataArray[i] = obj;
      break;
    }
  }

  //Viszzaírrjuk az adatokat a file-ba
  await this.write(dataArray);
  return obj;
}
// A teljes file tartalmát vissza adja egy tömbben
async getJsonArray() {
  const data = await FsUtil.readFile(this.jsonFilePath);
  return JSON.parse(data);
}

async write(dataArray) {
  const data = JSON.stringify(dataArray);
  await FsUtil.writeFile(this.jsonFilePath, data);
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

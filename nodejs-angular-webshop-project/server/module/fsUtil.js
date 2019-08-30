const fs = require('fs');

module.exports = class FsUtil {
    /**
     * This method reads the file
     * @param {string} path 
     * @param {string} encoding 
     */
  static readFile(path, encoding = 'utf8') {
    return new Promise((resolve, reject) => {
      fs.readFile(path, encoding, (err, data) => {
        if (err) {
          reject({
            type: 'Read error',
            error: err,
          });
        }
        resolve(data);
      });
    });
  }

  /**
   * This method writes the specified data into the file
   * @param {string} path the path of file
   * @param {any} data the content of file
   * @param {string} encoding encoding of writing process
   */
  static writeFile(path, data, encoding = 'utf8') {
    return new Promise((resolve, reject) => {
      fs.writeFileSync(path, data, encoding, (err) => {
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
};

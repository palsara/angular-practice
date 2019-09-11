const path = require('path');
const fs = require('fs');
const mariadb = require('mariadb');

const pool = mariadb.createPool({
  database: 'shop',
  user: 'root',
  password: 'ROOT',
  connectionLimit: 5,
});
module.exports = class DB {
  constructor() {
    pool.getConnection().then(conn => this.conn = conn);

  }

  mockData() {
    return new Promise((resolve, reject) => {
      const filePath = path.join(__dirname, 'products.json');
      fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) {
          return reject(err);
        }
        resolve(JSON.parse(content));
      });
    });
  }

  async read() {
    const sql = `
        SELECT
            p.id,
            p.name,
            p.price,
            p.stock,
            p.active,
            p.insdate,
            m.name AS manufacturer,
            m.contact
        FROM
            products p
        JOIN
            manufacturers m
        ON
            p.manufacturer=m.id`;

    const result = await this.conn.query(sql);
    return result;
  }

  async readOne(id) {
    const sql = `
    SELECT *
    FROM products
    WHERE id=${id}`;
    const result = await this.conn.query(sql);
    return result;
  }

  async create(data) {
    const sql =      `
        INSERT INTO products 
        (name, manufacturer, price, stock, active) 
        VALUES
        ('${data.name}', ${data.manufacturer}, ${data.price}, ${data.stock}, ${data.active})`;

    const result = await this.conn.query(sql);
    return result;
  }

  async delete(id) {
    const sql = `
      DELETE 
      FROM products
      WHERE id=${id}`;
    const result = await this.conn.query(sql);
    return result;
  }

  async update(id, data) {
    const sql = `
    UPDATE products
    SET name='${data.name}',manufacturer=${data.manufacturer},price=${data.price},stock=${data.stock},active=${data.active}
    WHERE id=${id}`;
    const result = await this.conn.query(sql);
    return result;
  }
};

const path = require('path');
const fs = require('fs');
const mariadb = require('mariadb');

const pool = mariadb.createPool({
  database: 'shop',
  user: 'root',
  password: 'ROOT',
  connectionLimit: 5,
});
module.exports = class UserDB {
  constructor() {
    pool.getConnection().then(conn => this.conn = conn);

  }

  async login(user) {
    const sql = `
      SELECT *
      FROM users
      WHERE email='${user.email}' 
      AND password=SHA1('${user.password}')`;

    const result = await this.conn.query(sql);
    return result;
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
    const sql = `
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
      WHERE products.id=${id}`;
    const result = await this.conn.query(sql);
    return result;
  }

  async update(id, data) { // nem kötelező az id, a data-ban benne van
    const sql = `
    UPDATE products
    SET name='${data.name}',manufacturer=${data.manufacturer},price=${data.price},stock=${data.stock},active=${data.active}
    WHERE products.id=${id}`;
    const result = await this.conn.query(sql);
    return result;
  }
};

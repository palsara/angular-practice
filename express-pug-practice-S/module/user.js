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

  async login(user) {
    const sql = `
            SELECT * FROM users 
            WHERE email = '${user.email}' 
                AND password = SHA1('${user.password}')
        `;
    const result = await this.conn.query(sql);
    return result;
  }

  async checkLogin(req) {
    if (!req.cookies.uuid) {
      return false
    }

    let sql = `
  SELECT * 
  FROM users
  WHERE token='${req.cookies.uuid}'`;

    let result = await this.conn.query(sql);
    return result[0]

  }

  async setUserToken(id, token) {
    let sql = `
  UPDATE users
  SET token='${token}'
  WHERE id='${id}'`

    await this.conn.query(sql);
    return true;
  }

  async read(id) {
    let sql = `
        SELECT *
        FROM 
            users
        `;

    if (id) {
      sql += ` WHERE users.id = ${id}`;
    }

    const result = await this.conn.query(sql);
    return result;

  }

  async create(data, token) {
    const sql = `
        INSERT INTO users 
        (name, email, password, token) 
        VALUES
        ('${data.name}', '${data.email}', SHA1('${data.password}'), '${token}')
        `;

    const result = await this.conn.query(sql);
    return result;
  }

  async delete(id) {
    const sql = `
            DELETE FROM users WHERE users.id = ${id}
        `;
    const result = await this.conn.query(sql);
    return result;
  }

  async update(user) {
    const sql = `
        UPDATE users 
        SET 
            name = '${user.name}', 
            email = '${user.email}', 
            password = '${user.password}', 
            token = '${user.token}',
        WHERE id = ${user.id}
        `;
    const result = await this.conn.query(sql);
    return result;
  }
};
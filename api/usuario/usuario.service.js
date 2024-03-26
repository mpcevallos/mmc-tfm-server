const pool = require("../../config/database");

module.exports = {
  createUsuario: (data, callback) => {
    console.log({ data });
    pool.query(
      `INSERT INTO Usuario (nombre, apellido, email, password) VALUES (?,?,?,?)`,
      [data.nombre, data.apellido, data.email, data.password],
      (err, results, fields) => {
        if (err) {
          return callback(err);
        }
        return callback(null, results);
      }
    );
  },
  getUsuarios: (callback) => {
    pool.query(
      //`SELECT id, nombre, apellido, email FROM Usuario`,
      `SELECT 
            usu.id, 
            usu.nombre, 
            usu.apellido, 
            usu.email,
            ava.imagen 
        FROM 
            Usuario usu 
        LEFT JOIN Avatar ava ON
            usu.avatar = ava.id `,
      [],
      (err, results, fields) => {
        if (err) {
          return callback(err);
        }
        return callback(null, results);
      }
    );
  },
  getUsuarioById: (id, callback) => {
    pool.query(
      `SELECT id, nombre, apellido, email FROM Usuario WHERE id = ?`,
      [id],
      (err, results, fields) => {
        if (err) {
          return callback(err);
        }
        console.log({ results });
        return callback(null, results[0]);
      }
    );
  },
  updateUsuario: (data, callback) => {
    console.log({ data });
    pool.query(
      `UPDATE Usuario SET nombre = ?, apellido = ?, email = ?, password = ?, avatar = ? WHERE id = ?`,
      [
        data.nombre,
        data.apellido,
        data.email,
        data.password,
        data.avatar,
        data.id,
      ],
      (err, results, fields) => {
        if (err) {
          return callback(err);
        }
        return callback(null, results);
      }
    );
  },
  deleteUsuario: (data, callback) => {
    console.log({ data });
    pool.query(
      `DELETE FROM Usuario WHERE id = ?`,
      [data.id],
      (err, results, fields) => {
        if (err) {
          return callback(err);
        }
        //console.log({results});
        return callback(null, results);
      }
    );
  },
  getUsuarioByEmail: (email, callback) => {
    pool.query(
      `SELECT 
                usu.id,
                usu.nombre,
                usu.apellido,
                usu.email,
                usu.password,
                ava.imagen 
            FROM 
                Usuario usu
            LEFT JOIN Avatar ava ON
                usu.avatar = ava.id 
            WHERE email = ?`,
      [email],
      (err, results, fields) => {
        if (err) {
          callback(err);
        }
        return callback(null, results[0]);
      }
    );
  },
};

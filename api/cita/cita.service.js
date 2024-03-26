const pool = require("../../config/database");

module.exports = {
  createCita: (data, callback) => {
    console.log({ data });
    pool.query(
      `INSERT INTO Cita (usuario, consultorio, especialidad, fecha, hora) VALUES (?,?,?,STR_TO_DATE(?,'%d/%m/%Y'),?)`,
      [
        data.usuario,
        data.consultorio,
        data.especialidad,
        data.fecha,
        data.hora,
      ],
      (err, results, fields) => {
        if (err) {
          return callback(err);
        }
        return callback(null, results);
      }
    );
  },
  getCitaByUsuario: (id, callback) => {
    pool.query(
      `
            SELECT 
                cit.id,
                cit.usuario,
                esp.nombre AS 'especialidad',
                con.nombre AS 'consultorio',
                hos.nombre AS 'hospital',
                DATE_FORMAT(cit.fecha, "%d/%m/%Y") AS 'fecha',
                TIME_FORMAT(cit.hora, "%H:%i") AS 'hora',
                DATE_FORMAT(cit.registro, "%d/%m/%Y %H:%i") AS 'registro',
                est.nombre AS 'estatus' 
            FROM 
                Cita cit
            INNER JOIN Consultorio con ON
                cit.consultorio  = con.id
            INNER JOIN Hospital hos ON
                con.hospital = hos.id 
            INNER JOIN Especialidad esp ON
                cit.especialidad = esp.id 
            INNER JOIN Estatus est ON
                cit.estatus = est.id 
            WHERE 
                cit.usuario = ?
            ORDER BY
                cit.fecha DESC,
                cit.hora DESC
                `,
      [id],
      (err, results, fields) => {
        if (err) {
          return callback(err);
        }
        console.log({ results });
        return callback(null, results);
      }
    );
  },
  /*getCita: callback => {
        pool.query(         
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
                if(err){
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
                if(err){
                    return callback(err);
                } 
                console.log({results});               
                return callback(null, results[0]);
            }
        );    
    },
    updateUsuario: (data, callback) => {
        console.log({data});
        pool.query(
            `UPDATE Usuario SET nombre = ?, apellido = ?, email = ?, password = ? WHERE id = ?`,
            [
                data.nombre,
                data.apellido,
                data.email,
                data.password,
                data.id
            ],
            (err, results, fields) => {
                if(err){
                    return callback(err);
                }
                return callback(null, results);
            }
        );    
    },
    deleteUsuario: (data, callback) => {
        console.log({data});
        pool.query(
            `DELETE FROM Usuario WHERE id = ?`,
            [data.id],
            (err, results, fields) => {
                if(err){                    
                    return callback(err);
                } 
                //console.log({results});               
                return callback(null, results);
            }
        );    
    },
    getUsuarioByEmail: (email, callback) => {        
        pool.query(
            `SELECT * FROM Usuario WHERE email = ?`,
            [email],
            (err, results, fields) => {
                if(err){                    
                    callback(err);
                }                 
                return callback(null, results[0]);
            }
        );    
    },*/
};

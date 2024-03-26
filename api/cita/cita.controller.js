const { createCita, getCitaByUsuario } = require ("./cita.service");
const { sign } = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    createCita: (req, res) => {
        const body = req.body;  
        createCita(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(400).json({
            success: 0,
            message: 'Database connection error',
          });
        }
        return res.status(201).json({
          success: 1,
          data: results,
        });
      });
    },

    getCitaByUsuario: (req, res) => {
        const id = req.params.id;
        getCitaByUsuario(id, (err, results) => {
            if(err){
                console.log(err);
                return;
                //return res.status
            }
            if(!results){
                return res.status(200).json({
                    success: 0,
                    message: 'getCitaByUsuario: Record not found'
                })    
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        });
    },
}
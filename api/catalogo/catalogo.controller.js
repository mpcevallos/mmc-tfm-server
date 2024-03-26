const { getCatalogoById } = require ("./catalogo.service");
const { sign } = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    getCatalogoById: (req, res) => {
        const id = req.params.id;
        getCatalogoById(id, (err, results) => {
            if(err){
                console.log(err);
                return;
                //return res.status
            }
            if(!results){
                return res.status(200).json({
                    success: 0,
                    message: 'getCatalogoById: Record not found'
                })    
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        });
    },
}
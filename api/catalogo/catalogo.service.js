const pool = require('../../config/database');

module.exports = {    
    getCatalogoById: (id, callback) => {
        //Id = ?
        //1 = Especialidad
        //2 = Consultorio
        //3 = Hospital

        let strQuery = '';
        switch (id){
            case '1':
                strQuery  = 'SELECT id, nombre FROM Especialidad ORDER BY nombre';
                break;
            case '2':
                strQuery  = 'SELECT id, nombre FROM Consultorio ORDER BY nombre';
                break;
            case '3':
                strQuery  = 'SELECT id, nombre FROM Hospital ORDER BY nombre';
                break;
            default:
                strQuery  = "SELECT -1 AS id, 'Catalogo no definido' AS error";
                break;
        }

        console.log({id});
        console.log({strQuery});

        pool.query(            
            strQuery,
            [id],
            (err, results, fields) => {
                if(err){
                    return callback(err);
                } 
                console.log({results});               
                return callback(null, results);
            }
        );    
    },
}
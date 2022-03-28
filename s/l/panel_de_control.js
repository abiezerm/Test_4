const conectar = require('../conexion');

/* clase
--------------------------------------------------------------------------------*/
class Administrar {

    static
    insertar(req, res) {
        conectar.query('INSERT INTO direcciones VALUES (NULL, ?)', [req], function (error) {
            if(error) { throw error; }
            else { Administrar.leer(res); }
        });
    }
    static
    actualizar(req, id, res) {
        conectar.query('UPDATE direcciones SET ? WHERE id = ?', [req, id], function (error) {
            if(error) { throw error; } 
            else { Administrar.leer(res); }
        });
    }
    static
    crear(req, res) {
        const { id, nombre, correo, direccion, submit } = req.body;

        if (!id || !nombre || !correo || !direccion || !submit) {
            res.status(400).send('Los campos no pueden estar vacios.');
            return;
        } 

        if(submit === 'Insertar') {
            let valores = [nombre, correo, direccion];
            
            conectar.query('SELECT COUNT(correo) AS n FROM direcciones WHERE correo = ?', [correo], function (error, resultado) {
                if(error) { 
                    throw error; 
                } else if(resultado[0].n >= 2) {
                    res.setHeader('Content-type', 'text/json');
                    res.send({ res: 0 });
                } else {
                    Administrar.insertar(valores, res);
                }
            });   
        } else if(submit === 'Actualizar') {
            let valores = {
                nombre: nombre, 
                correo: correo, 
                direccion: direccion
            };

            Administrar.actualizar(valores, id, res);
        }
    }
    static
    leer(res) {
        conectar.query('SELECT * FROM direcciones ORDER BY id DESC LIMIT 2', function (error, resultado) {
            if(error) { throw error; } 
            else {
                res.setHeader('Content-type', 'text/json');
                res.send(resultado);
            }
        });
    }
    static
    editar(req, res) {
        conectar.query('SELECT * FROM direcciones WHERE id = ?', [req.params.id], function (error, resultado) {
            if(error) { throw error; } 
            else {
                res.setHeader('Content-type', 'text/json');
                res.send(resultado);
            }
        });
    }
    static
    obtener(req, res) {
        let order;
        
        switch (req.params.id) {
            case "ASC":     order = 'ORDER BY id ASC';      break;
            case "DESC":    order = 'ORDER BY id DESC';     break;
            case "nombre":  order = 'ORDER BY nombre DESC'; break;
            case "correo":  order = 'ORDER BY correo DESC'; break;
            default:        order = 'ORDER BY id DESC';     break;
        }
    
        conectar.query(`SELECT * FROM direcciones ${order} LIMIT 2`, function (error, resultado) {
            if(error) { throw error; } 
            else {
                res.setHeader('Content-type', 'text/json');
                res.send(resultado);
            }
        });
    }
    static
    eliminar(req, res) {
        conectar.query('DELETE FROM direcciones WHERE id = ?', [req.params.id], function (error, resultado) {
            if(error) { throw error; } 
            else { Administrar.leer(res); }
        });
    }
    static
    buscar(req, res) {
        conectar.query(`SELECT * FROM direcciones   WHERE 
            nombre LIKE '%${req.body.buscar}%'      OR 
            correo LIKE '%${req.body.buscar}%'      OR 
            direccion LIKE '%${req.body.buscar}%'   ORDER BY id DESC LIMIT 10`, function (error, resultado) {
            
            if(error) { throw error; } 
            else {
                res.setHeader('Content-type', 'text/json');
                res.send(resultado);
            }
        });
    }
    static
    limite(req, res) {
        conectar.query('SELECT COUNT(?) AS limite FROM direcciones', [req.params.id], function (error, resultado) {
            if(error) { throw error; } 
            else {
                res.setHeader('Content-type', 'text/json');
                res.send(resultado);
            }
        });
    }
    static 
    paginacion(req, res) { 
        let n = Number(req.body.pagina);
        
        conectar.query('SELECT * FROM direcciones ORDER BY id DESC LIMIT 2 OFFSET ?', [n], function (error, resultado) {
            if (error) { throw error; } 
            else {
                res.setHeader('Content-type', 'text/json');
                res.send(resultado);
            }
        });
    }
}

/* exportar
--------------------------------------------------------------------------------*/
module.exports = Administrar;
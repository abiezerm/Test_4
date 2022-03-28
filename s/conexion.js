var mysql = require('mysql');

var conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'empresa_x'
});

conexion.connect(function (error) {
    if (error) {
        throw error;
        return error;
        console.log("Conexion fallida");
    } else {
        console.log("Conectado!");
        return true;
    }
});

module.exports = conexion;
module.exports = async function connect() {
    if (global.connection)
        return global.connection.connect();
 
    const { Pool } = require('pg');
    const pool = new Pool({
        connectionString: 'postgres://postgres:postgres@localhost:5432/primeira_api'
    });

    //guardando para usar sempre o mesmo
    global.connection = pool;
    return pool.connect();
}
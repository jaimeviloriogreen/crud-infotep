import { createConnection } from "mysql2/promise";

async function connectToMysql(DB_HOST, DB_USER, DB_DATABASE, DB_PASS, DB_PORT ){
    try {
        const mysql = await createConnection({
            host:DB_HOST, 
            user:DB_USER, 
            database:DB_DATABASE, 
            password:DB_PASS, 
            port:DB_PORT
        });
        return mysql;

    } catch (err) {
        return err.message;
    }

}

export default connectToMysql
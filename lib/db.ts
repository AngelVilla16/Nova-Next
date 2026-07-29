import mysql  from 'mysql2/promise';

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    waitForConnections: true,
    connectionLimit:10,
    queueLimit:0

});
// Helper para limpiar consultas
export async function query(sql:string, values?:any[]){
    try{
        const [rows] = await pool.execute(sql, values);
        return rows;
    }
    catch(error:any){
        console.error("Error en la base de datos: ", error);
        throw new Error(error.message);
    }
}

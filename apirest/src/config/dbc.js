const {Pool, Client}=require('pg');
const {DB_HOST,DB_USER,DB_PASSWORD,DB_DATABASE,DB_PORT}=require('./index');

const DataBaseConfig={
    host: DB_HOST,
    user: DB_USER,
    database:DB_DATABASE,
    password:DB_PASSWORD,
    port: DB_PORT,
    
}


const test = async () => {
    try{
        new Pool(DataBaseConfig)
        console.log('Conexion exitosa con la base de datos')
        
    }catch(err){
        console.error(err)
        throw new Error('Error de conexion con la base de datos')
    }
}
const db=new Pool(DataBaseConfig)


module.exports = {db,test};

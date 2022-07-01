const {db}= require('../config/dbc')

const getMarca = async(req, res)=>{
    const response = await db.query('Select * from Marca');
    res.status(200).json(response.rows);
}



module.exports={
    getMarca   
}

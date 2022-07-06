const {db}= require('../config/dbc');
const bcryptjs =require('bcryptjs');
const {JWT_SECRET}=require('../config/index')
const jwt = require("jsonwebtoken");

const getMarca = async(req, res, next)=>{
    const user=  await db.query("Select * from usuario where usuario_id = $1",[req.userId])
    if(user.rowCount==0){
        return res.status(404).json({msg: `No se encuentra el usuario`})
    }else{
        res.status(200).json(user.rows); 
    }
}

const singup = async(req, res, next)=>{
    const { cedula,email, password} = req.body
    const existeUser = await db.query("Select usuario_correo from usuario where usuario_correo = $1",[email])
    if(existeUser.rowCount==0){

        const passwordencry = await encryptPassword(password);
        const idempleado = await (await db.query("Select empleado_id from empleado where empleado_cedula = $1",[cedula])).rows[0].empleado_id
    
        await db.query("Insert into usuario values (default, $1 , $2, $3) ",[email,passwordencry,idempleado]);

        const idusuario = await db.query("Select usuario_id from usuario where usuario_correo = $1",[email]);

        const token = jwt.sign({id: idusuario.rows[0].usuario_id}, JWT_SECRET, {
            expiresIn: 60*60*24
        })
        res.status(200).json({msg: `El usuario fue creado satisfactoriamente`, auth: true, token}); 
        
    }else{
        return res.status(404).json({msg: `El correo: ${email} ya se encuentra registrado`})
    }

}


const singin = async(req, res, next)=>{
    const { email, password} = req.body
    const existeUser = await db.query("Select * from usuario where usuario_correo = $1",[email])
    if(existeUser.rowCount==0){
        return res.status(404).json({msg: `El correo no esta registrado`})
    }else{
        const passwordValidation = await comparePassword(password, existeUser.rows[0].usuario_password)
        if(!passwordValidation){
          return res.status(400).json({auth:false, token:null})
        }
        const token = jwt.sign({id: existeUser.rows[0].usuario_id}, JWT_SECRET, {
            expiresIn: 60*60*24
        })
        res.status(200).json({auth: true, token});

    }
}


const encryptPassword = async (password) => {
    const salt = await bcryptjs.genSalt(9)
    const hash = bcryptjs.hash(password, salt)
    return hash
}
const comparePassword = async(passwordbody,password) => {
    return await bcryptjs.compare(passwordbody, password)
}

module.exports={
    getMarca,
    singin,
    singup
}

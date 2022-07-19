const {response}=require('express');
const { HOST, PORT } = require('../config');
const {db}= require('../config/dbc');
const cloudinary = require("../config/cloudinary");
const upload = require("../middlewares/uploadimg");


const getMarca = async(req, res, next)=>{
   if(req.file){
    const {filename}=req.file
    const URLIMG = setUrl(filename)
   }
}
const getOrdenadores = async(req, res, next)=>{
    const ordenadores=  await db.query('Select * from ordenador '+
    'inner join departamento on '+
    'departamento.departamento_id= ordenador.ordenador_departamentoid '+
    'inner join tipo_ordenador on '+
    'tipo_ordenador.tipoordenador_id = ordenador.ordenador_tipoordenadorid')
    res.status(200).json(ordenadores.rows); 
}

const getSoftware=async(req, res, next)=>{
    const tipo=  await db.query('SELECT * FROM software')
    res.status(200).json(tipo.rows); 
}
const getDepartamento=async(req, res, next)=>{
    const tipo=  await db.query('SELECT * FROM departamento')
    res.status(200).json(tipo.rows); 
}
const getTipoOrdenador=async(req, res, next)=>{
    const tipo=  await db.query('SELECT * FROM tipo_ordenador')
    res.status(200).json(tipo.rows); 
}
/*
const insertOrdenador=async(req, res, next)=>{
   const {serie,departamento,tipoordenador,fechaAquisicion,fechaFinGarantia,componentes,softwares}=req.body
   const{filename}=req.file
   const URLIMG = setUrl(filename)
   const estado="Activo"
   await db.query(`Insert into ordenador values (default, $1, $2, $3, $4, $5, $6, $7)`,[serie,fechaAquisicion,
      fechaFinGarantia,departamento,tipoordenador,estado,URLIMG]).
      then(async()=>{
         let idOrdenador= await db.query(`Select ordenador_id from ordenador where ordenador_serie = $1`,[serie])
         componentes.forEach(async(elemento,index) => {
            let componentesConvertido=JSON.parse(componentes[index])
            let {componenteid,componenteserial}= componentesConvertido
            await db.query(`Insert into ordenador_componente values (default, $1, $2, $3)`,[idOrdenador.rows[0].ordenador_id,componenteid,componenteserial])
         });
      }).then(()=>{
         softwares.forEach(async(elemento,index) => {
            let idOrdenador= await db.query(`Select ordenador_id from ordenador where ordenador_serie = $1`,[serie])
            let softwaresConvertido=JSON.parse(softwares[index])
            let {softwareid}= softwaresConvertido
            await db.query(`Insert into ordenador_software values (default, $1, $2)`,[idOrdenador.rows[0].ordenador_id,softwareid])
         });
      }).then(()=>{
         res.status(200).json({msg:"Ordenador insertado de manera exitosa"});
      })
      .catch((e)=>{
         res.status(404).json({msg:"Existe un error al momento de insertar",error:e}); 
      })
}
*/
const insertOrdenador=async(req, res, next)=>{
   const {serie,departamento,tipoordenador,fechaAquisicion,fechaFinGarantia,componentes,softwares}=req.body
   const result = await cloudinary.uploader.upload(req.file.path);
   const URLIMG = result.url
   const estado="Activo"
   await db.query(`Insert into ordenador values (default, $1, $2, $3, $4, $5, $6, $7)`,[serie,fechaAquisicion,
      fechaFinGarantia,departamento,tipoordenador,estado,URLIMG]).
      then(async()=>{
         let idOrdenador= await db.query(`Select ordenador_id from ordenador where ordenador_serie = $1`,[serie])
         componentes.forEach(async(elemento,index) => {
            let componentesConvertido=JSON.parse(componentes[index])
            let {componenteid,componenteserial}= componentesConvertido
            await db.query(`Insert into ordenador_componente values (default, $1, $2, $3)`,[idOrdenador.rows[0].ordenador_id,componenteid,componenteserial])
         });
      }).then(()=>{
         softwares.forEach(async(elemento,index) => {
            let idOrdenador= await db.query(`Select ordenador_id from ordenador where ordenador_serie = $1`,[serie])
            let softwaresConvertido=JSON.parse(softwares[index])
            let {softwareid}= softwaresConvertido
            await db.query(`Insert into ordenador_software values (default, $1, $2)`,[idOrdenador.rows[0].ordenador_id,softwareid])
         });
      }).then(()=>{
         res.status(200).json({msg:"Ordenador insertado de manera exitosa"});
      })
      .catch((e)=>{
         res.status(404).json({msg:"Existe un error al momento de insertar",error:e}); 
      })
}
const borrarOrdenador= async (req, res ,next)=>{
   const {id} = req.params;
   try{
      await db.query("DELETE FROM mantenimiento where mantenimiento_ordenadorid = $1 ",[id])  
      await db.query("DELETE FROM ordenador_componente where ordenadorcomponente_ordenadorid = $1 ",[id])  
      await db.query("DELETE FROM ordenador_software where ordenadorsoftware_ordenadorid = $1 ",[id])
      await db.query('DELETE FROM ordenador WHERE ordenador_id = $1',[id]);
      res.status(200).json({msg:"Ordenador eliminado de manera exitosa"}); 
   }
   catch (error){
       res.status(404).json({msg:"Existe un error al momento de eliminar",error:error}); 
   }
}

const busquedaSerial=async(req, res, next)=>{
   const {serial} = req.params;
   const ordenadorSerial=  await db.query(`SELECT ordenador_id FROM ordenador Where ordenador_serie = ${serial}`)
   res.status(200).json(ordenadorSerial.rows); 
}

const ordenadorPorId=async(req, res, next)=>{
   const {id} = req.params;
   const ordenadorSerial=  await db.query(`SELECT * FROM ordenador Where ordenador_id = ${id}`)
   res.status(200).json(ordenadorSerial.rows); 
}

const actualizarOrdenador= async (req, res,next)=>{
   const {id} = req.params;
   let {departamento,estado} = req.body;
   try{
       await db.query('UPDATE ordenador '+
       'SET ordenador_departamentoid = $1, ordenador_estado = $2 '+
       'WHERE ordenador_id = $3 ',[departamento,estado,id]);
       res.status(200).json({msg:"Ordenador modificado de manera exitosa"}); 
   }
   catch (error){
       res.status(404).json({msg:"Existe un error al momento de modificar",error:error}); 
   }
 }

const setUrl = (filename)=>{
    const URL=`${HOST}:${PORT}/public/${filename}`
    return URL
 }

module.exports={
    getMarca,
    getOrdenadores,
    getSoftware,
    getDepartamento,
    getTipoOrdenador,
    insertOrdenador,
    borrarOrdenador,
    busquedaSerial,
    ordenadorPorId,
    actualizarOrdenador
}

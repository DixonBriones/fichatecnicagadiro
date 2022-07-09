const {response}=require('express');
const { HOST, PORT } = require('../config');
const {db}= require('../config/dbc');

const getMarca = async(req, res, next)=>{
 //  if(req.file){
   // const {filename}=req.file
    //const URLIMG = setUrl(filename)
  // }
}
const getComponentes = async(req, res, next)=>{
    const ordenadores=  await db.query('SELECT componente_id,componente_nombre, '+
    'marca_nombre,tipocomponente_nombre, componente_fotourl FROM componente '+
    'inner join marca '+
    'on marca.marca_id = componente.componente_marcaid '+
    'inner join tipo_componente '+
    'on tipo_componente.tipocomponente_id= componente.componente_tipoid')
    res.status(200).json(ordenadores.rows); 
 }

const getMarcas=async(req, res, next)=>{
    const marcas=  await db.query('SELECT * FROM marca')
    res.status(200).json(marcas.rows); 
 }
const getTipoComponentes=async(req, res, next)=>{
    const tipo=  await db.query('SELECT * FROM tipo_componente')
    res.status(200).json(tipo.rows); 
 }

const getComponenteID=async(req, res, next)=>{
    const {id} = req.params;
    const tipo=  await db.query('SELECT * FROM componente where componente_id = $1',[id])
    res.status(200).json(tipo.rows); 
}

const insertComponente=async(req, res, next)=>{
    const {nombre,marca,tipo}=req.body
    const{filename}=req.file
    const URLIMG = setUrl(filename)
    await db.query('Insert into componente values (default, $1, $2, $3, $4)',[nombre,tipo,marca,URLIMG]);
    res.status(200).json({msg:"Componente insertado de manera exitosa"}); 
 }

  const actualizarComponente= async (req, res,next)=>{
    const {id} = req.params;
    let {nombre,marca,tipo,fotoactual} =  req.body;
    if(req.file){
        const{filename}=req.file
        fotoactual = setUrl(filename)
    
    }
    try{
        await db.query('UPDATE componente '+
        'SET componente_nombre = $1, componente_tipoid= $2, componente_marcaid= $3, '+
        'componente_fotourl = $4 '+
        'WHERE componente_id = $5 ',[nombre,tipo,marca,fotoactual,id]);
        res.status(200).json({msg:"Componente modificado de manera exitosa"}); 
    }
    catch (error){
        res.status(404).json({msg:"Existe un error al momento de eliminar",error:error}); 
    }
  }
  

  const borrarComponente= async (req, res ,next)=>{
    const {id} = req.params;
    try{
        await db.query('DELETE FROM componente WHERE componente_id = $1',[id]);
        res.status(200).json({msg:"Componente eliminado de manera exitosa"}); 
    }
    catch (error){
        res.status(404).json({msg:"Existe un error al momento de eliminar",error:error}); 
    }
  }

const setUrl = (filename)=>{
    const URL=`${HOST}:${PORT}/public/${filename}`
    return URL
 }

module.exports={
    getMarca,
    getComponentes,
    getMarcas,
    getTipoComponentes,
    insertComponente,
    actualizarComponente,
    borrarComponente,
    getComponenteID
}

const {response}=require('express');
const { HOST, PORT } = require('../config');
const {db}= require('../config/dbc');

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

const setUrl = (filename)=>{
    const URL=`${HOST}:${PORT}/public/${filename}`
    return URL
 }

module.exports={
    getMarca,
    getOrdenadores
}

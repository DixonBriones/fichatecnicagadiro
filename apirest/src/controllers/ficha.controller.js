const {db}= require('../config/dbc');

const getComponentesFicha = async(req, res, next)=>{
    const {id} = req.params;
    const ordenadores=  await db.query('select tipocomponente_nombre, '+
        'marca_nombre, componente_nombre, ordenadorcomponente_serial from ordenador_componente '+
        'inner join componente on '+
        'ordenador_componente .ordenadorcomponente_componenteid= componente.componente_id '+
        'inner join tipo_componente on '+
        'tipo_componente.tipocomponente_id = componente.componente_tipoid '+
        'inner join marca on '+
        'marca.marca_id = componente.componente_marcaid '+
        'where ordenadorcomponente_ordenadorid= $1',[id])
    res.status(200).json(ordenadores.rows); 
}

const getSoftwereFicha = async(req, res, next)=>{
    const {id} = req.params;
    const software=  await db.query('select software_nombre from ordenador_software '+
    'inner join software on '+
    'ordenador_software.ordenadorsoftware_sotfwareid = software.software_id '+
    'where ordenadorsoftware_ordenadorid= $1',[id])
    res.status(200).json(software.rows); 
}

const getOrdenadorFicha = async(req, res, next)=>{
    const {id} = req.params;
    const ordenador=  await db.query('select ordenador_serie, ordenador_fechaadquisicion, '+
    'ordenador_fechafingarantia, ordenador_estado, ordenador_foto, '+
    'tipoordenador_nombre, departamento_nombre from ordenador '+
    'inner join tipo_ordenador on '+
    'ordenador.ordenador_tipoordenadorid= tipo_ordenador.tipoordenador_id '+
    'inner join departamento on '+
    'departamento.departamento_id = ordenador.ordenador_departamentoid '+
    'where ordenador_id = $1',[id])
    res.status(200).json(ordenador.rows); 
}

module.exports={
    getComponentesFicha,
    getSoftwereFicha,
    getOrdenadorFicha
}
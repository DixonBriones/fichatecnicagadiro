const {db}= require('../config/dbc');

const getMantenimiento= async(req, res, next)=>{
    const mantenimiento=  await db.query('Select * from mantenimiento '+
    'inner join ordenador on '+
    'ordenador.ordenador_id = mantenimiento.mantenimiento_ordenadorid '+
    'inner join empleado on '+
    'mantenimiento.mantenimiento_tecnicoid = empleado.empleado_id')
    res.status(200).json(mantenimiento.rows); 
}

const getTecnico= async(req, res, next)=>{
    const tecnico=  await db.query(`Select * from empleado `+
    `inner join cargo on `+
    `empleado.empleado_cargoid = cargo.cargo_id `+
    `where cargo_nombre = 'Tecnico'`)
    res.status(200).json(tecnico.rows); 
}
const getOrdenador= async(req, res, next)=>{
    const ordenador=  await db.query(`Select ordenador_serie, ordenador_id from ordenador `)
    res.status(200).json(ordenador.rows); 
}
const insertMantenimiento=async(req, res, next)=>{
    const {fechaMantenimiento,observaciones,ordenador,tecnico}=req.body
    await db.query('Insert into mantenimiento values (default, $1, $2, $3, $4)',[fechaMantenimiento,ordenador,tecnico,observaciones]);
    res.status(200).json({msg:"Componente insertado de manera exitosa"}); 
}

const deleteMantenimiento= async (req, res ,next)=>{
    const {id} = req.params;
    await db.query('DELETE FROM mantenimiento WHERE mantenimiento_id = $1',[id])
    .then(()=>{
        res.status(200).json({msg:"Mantenimiento eliminado de manera exitosa"}); 
    }).catch((error)=>{
        res.status(404).json({msg:"Existe un error al momento de eliminar",error:error}); 
    });
    
 }

 const getMantenimientoID= async(req, res, next)=>{
    const {id} = req.params;
    const mantenimiento=  await db.query(`Select mantenimiento_id, mantenimiento_observacion from mantenimiento
    where mantenimiento_id = $1`,[id])
    res.status(200).json(mantenimiento.rows); 
}

 const actualizarMantenimiento= async (req, res ,next)=>{
    const {id} = req.params;
    const {mantenimiento_observacion} =  req.body;
    await db.query('Update mantenimiento '+
    'SET mantenimiento_observacion = $1 '+
    'WHERE mantenimiento_id = $2',[mantenimiento_observacion,id])
    .then(()=>{
        res.status(200).json({msg:"Mantenimiento actualizado de manera exitosa"}); 
    }).catch((error)=>{
        res.status(404).json({msg:"Existe un error al momento de eliminar",error:error}); 
    });
    
 }
module.exports={
    getMantenimiento,
    getTecnico,
    getOrdenador,
    insertMantenimiento,
    deleteMantenimiento,
    actualizarMantenimiento,
    getMantenimientoID
}
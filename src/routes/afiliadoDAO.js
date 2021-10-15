const express = require('express');
const router = express.Router();

//conexion bbddd
const conexionBD = require('../database/bd');
let persona = require('./afiliado');
let p;
let citas ;
let citasAfiliado;

router.post('/afiliadoSesion.html', async(req, res) =>{
    //console.log("HOLA");
    const numDoc = req.body.numdoc;
    const tipoDoc = req.body.tipoDocumento ;
    const contraseña = req.body.contraseña;
    //console.log(contraseña);
    if (numDoc && tipoDoc && contraseña) {
        const respuesta = await conexionBD.query('SELECT * FROM afiliado WHERE k_numerodocumentoafiliado = $1', [numDoc]);
        const per = respuesta.rows[0];
        //console.log(respuesta.rows);
        if (per.k_numerodocumentoafiliado.toString() === numDoc && per.k_numerodocumentoafiliado.toString() === contraseña) {
            const respuesta2 = await conexionBD.query('SELECT c.k_idcategoria, a.*, ta.k_telefono FROM telefonoafiliado ta, categoria c, eps e, epscategoria ec , afiliado a WHERE c.k_idcategoria = ec.k_idcategoria AND ec.k_ideps = e.k_ideps AND e.k_ideps = a.k_ideps AND ta.k_numerodocumentoafiliado = a.k_numerodocumentoafiliado AND a.k_numerodocumentoafiliado = $1 AND c.k_idcategoria = 2', [per.k_numerodocumentoafiliado])
            const perData = respuesta2.rows;
            //console.log(perData);
            p = new persona(perData[0].n_nombre, perData[0].n_apellido, perData[0].k_tipodocumentoafiliado, perData[0].k_numerodocumentoafiliado, perData[0].o_correoafiliado, perData[0].n_tipoafiliacion, perData[0].f_nacimiento, perData[0].n_sexo, perData[0].n_estadoafiliado, perData[0].k_telefono, perData[0].k_idcategoria, perData[0].k_tipoidresponsable, perData[0].k_idresponsable);
            //console.log(p);
            res.render('afiliadoSesion.html', {
                nombre: p.nombre.toUpperCase()+" "+p.apellido.toUpperCase()
            })
        }else{
            res.render('index.html')
        }
    }else{
        res.render('index.html')
    }
}) 

router.get('/afiliadoInfo.html', async(req, res)=>{
    //console.log(p);
    res.render('afiliadoInfo.html',{
        nombreCompleto: p.nombre.toUpperCase() + " " +p.apellido.toUpperCase(),
        nombre: p.nombre,
        apellido: p.apellido,
        tipoDocAfiliado: p.tipoDocumento,
        numDocAfiliado: p.numDocumento,
        correo: p.correo,
        tipoAfiliacion: p.tipoAfiliacion,
        fechaNacimiento: p.fNacimiento,
        sexo: p.sexo,
        estadoAfiliado: p.estado,
        telefonos: p.telefonoCon,
        categoriaAfiliado: p.categoria,
        tipoDocRes: p.tipDocResponsable,
        numDocRes: p.numDocResponsable
    })
})

router.get('/index.html', async(req, res)=>{
    res.render('index.html')
})

router.get('/afiliadoSesion.html', async(req, res)=>{
    //console.log("sss");
    res.render('afiliadoSesion.html',{
        nombre: p.nombre.toUpperCase()+" "+p.apellido.toUpperCase()
    })
})

router.get('/afiliadoCitas.html', async(req, res)=>{
    //console.log(p);
    const respuesta = await conexionBD.query('SELECT c.f_horainicio, m.n_nombre, m.n_apellido, s.n_direccion, c.n_especialidad, c.k_idCita from sede s , medico m ,tipocita t, cita c, consultorio con, especialidadmedico em, agenda a, tipocitaagenda tpc WHERE con.k_codigosede = s.k_codigosede AND con.k_numerodocumento = m.k_numerodocumento AND a.k_numerodocumento = m.k_numerodocumento AND a.k_tipodocumento = m.k_tipodocumento AND em.k_especialidadmedico = c.n_especialidad AND em.k_numerodocumento = m.k_numerodocumento AND a.k_numerodocumento = tpc.k_numerodocumento AND a.k_mes = tpc.k_mes AND a.k_numeroagenda = tpc.k_numeroagenda AND tpc.k_idtipocita = t.k_idtipocita AND t.k_idtipocita = c.k_idtipocita AND c.n_estadocita = $1', ["A"]);
        citas = respuesta.rows;
        //console.log(citas);
        res.render('afiliadoCitas.html', {
            datos : citas,
            nombreAfiliado: p.nombre.toUpperCase()+" "+p.apellido.toUpperCase(),
        })
})

router.get('/afiliadoConsultaCitas.html', async(req, res)=>{
    const respuesta2 = await conexionBD.query('SELECT c.f_horainicio, m.n_nombre, m.n_apellido, c.n_especialidad, s.n_direccion, tc.n_nombrecita FROM cita c, medico m, especialidadmedico em, sede s, consultorio con, agenda a, tipocitaagenda tpc, tipocita tc, diagnostico d, afiliado af  WHERE s.k_codigosede = con.k_codigosede AND con.k_numerodocumento = m.k_numerodocumento AND m.k_numerodocumento = em.k_numerodocumento AND m.k_numerodocumento = a.k_numerodocumento AND tpc.k_numerodocumento = a.k_numerodocumento AND em.k_especialidadmedico = c.n_especialidad AND a.k_mes = tpc.k_mes AND a.k_numeroagenda = tpc.k_numeroagenda AND tc.k_idtipocita = tpc.k_idtipocita AND tc.k_idtipocita = c.k_idtipocita AND c.k_idcita = d.k_idcita AND af.k_numerodocumentoafiliado = d.k_numerodocumentoafiliado AND af.k_tipodocumentoafiliado = d.k_tipodocumentoafiliado AND af.k_numerodocumentoafiliado = $1 AND af.k_tipodocumentoafiliado = $2', [p.numDocumento, p.tipoDocumento]);
    citasAfiliado = respuesta2.rows;
    console.log(citasAfiliado);
    res.render('afiliadoConsultaCitas.html', {
        nombreAfiliado: p.nombre.toUpperCase()+" "+p.apellido.toUpperCase(),
        citasA:citasAfiliado
    });
})

router.post('/afiliadoCitas.html', async(req, res)=>{
    const tipoCita = req.body.tipoCita;
    const especialidad = req.body.especialidad;
    if (tipoCita && especialidad) {
        const respuesta = await conexionBD.query('SELECT c.f_horainicio, m.n_nombre, m.n_apellido, s.n_direccion, c.n_especialidad, c.k_idCita from sede s , medico m ,tipocita t, cita c, consultorio con, especialidadmedico em, agenda a, tipocitaagenda tpc WHERE con.k_codigosede = s.k_codigosede AND con.k_numerodocumento = m.k_numerodocumento AND a.k_numerodocumento = m.k_numerodocumento AND a.k_tipodocumento = m.k_tipodocumento AND em.k_especialidadmedico = c.n_especialidad AND em.k_numerodocumento = m.k_numerodocumento AND a.k_numerodocumento = tpc.k_numerodocumento AND a.k_mes = tpc.k_mes AND a.k_numeroagenda = tpc.k_numeroagenda AND tpc.k_idtipocita = t.k_idtipocita AND t.k_idtipocita = c.k_idtipocita AND c.n_especialidad = $1 AND t.n_nombrecita = $2 AND c.n_estadocita = $3', [especialidad, tipoCita, "A"]);
        //console.log(respuesta.rows);
        let citasFiltradas = respuesta.rows;
        if (citasFiltradas.length>0) {
            res.render('afiliadoCitas.html', {
                datos : citasFiltradas,
                nombreAfiliado: p.nombre.toUpperCase()+" "+p.apellido.toUpperCase(),
            })
        }else{
            //console.log(c);
            res.render('afiliadoCitas.html', {
                datos: citas,
                nombreAfiliado: p.nombre.toUpperCase()+" "+p.apellido.toUpperCase(),
            })
        }
    }
})

router.post('/afiliadoConsultaCitas.html', async(req, res)=>{
    const cita = req.body.citaId;
    const especialidadCita = req.body.especialidadCita;
    //console.log(cita, especialidadCita);

    if (cita && especialidadCita) {
        const validacionRep = await conexionBD.query('SELECT * FROM cita c, diagnostico d, afiliado a WHERE c.k_idcita = d.k_idcita AND d.k_numerodocumentoafiliado = a.k_numerodocumentoafiliado AND c.n_especialidad = $1', [especialidadCita]);
        if (validacionRep.rowCount === 0) {
            const respuesta1 = await conexionBD.query('INSERT INTO diagnostico (n_prescripcion, k_idcita, k_numerodocumentoafiliado, k_tipodocumentoafiliado) VALUES ($1, $2, $3, $4)', [" ", cita, p.numDocumento, p.tipoDocumento]);
            const respuesta3 = await conexionBD.query('UPDATE cita SET n_estadocita = $1 WHERE k_idcita = $2', ["I", cita] );
            const respuesta2 = await conexionBD.query('SELECT c.f_horainicio, m.n_nombre, m.n_apellido, c.n_especialidad, s.n_direccion, tc.n_nombrecita FROM cita c, medico m, especialidadmedico em, sede s, consultorio con, agenda a, tipocitaagenda tpc, tipocita tc, diagnostico d, afiliado af  WHERE s.k_codigosede = con.k_codigosede AND con.k_numerodocumento = m.k_numerodocumento AND m.k_numerodocumento = em.k_numerodocumento AND m.k_numerodocumento = a.k_numerodocumento AND tpc.k_numerodocumento = a.k_numerodocumento AND em.k_especialidadmedico = c.n_especialidad AND a.k_mes = tpc.k_mes AND a.k_numeroagenda = tpc.k_numeroagenda AND tc.k_idtipocita = tpc.k_idtipocita AND tc.k_idtipocita = c.k_idtipocita AND c.k_idcita = d.k_idcita AND af.k_numerodocumentoafiliado = d.k_numerodocumentoafiliado AND af.k_tipodocumentoafiliado = d.k_tipodocumentoafiliado AND af.k_numerodocumentoafiliado = $1 AND af.k_tipodocumentoafiliado = $2', [p.numDocumento, p.tipoDocumento]);
            citasAfiliado = respuesta2.rows;
            console.log(citasAfiliado);
            res.render('afiliadoConsultaCitas.html', {
                nombreAfiliado: p.nombre.toUpperCase()+" "+p.apellido.toUpperCase(),
                citasA:citasAfiliado
            });
        }else{
            res.send("NO ES POSIBLE, YA TIENE UNA CITA DE EL TIPO")
        }
        //
    }else{
        
    }
})

module.exports = router;


































// //console.log(citasAfiliado);
            // res.render('AfiliadoConsultaCitas.html', {
            //     citasA: citasAfiliado,
            //     nombreAfiliado: p.nombre.toUpperCase()+" "+p.apellido.toUpperCase()
            // })


// router.get('/index.html', (req, res)=>{
//     res.render('index.html');
// })

// // router.get('/afiliadoSesion.html', (req, res)=>{
// //     res.render('afiliadoSesion.html');
// // })

// router.get('/admin.html', (req, res)=>{
//     res.render('admin.html');
// })

// router.get('/afiliadoCitas.html', (req, res)=>{
//     res.render('afiliadoCitas.html');
// })



// router.get('/afiliadoInfo.html', (req, res)=>{
//     res.render('afiliadoInfo.html');
// })

// router.get('/medicoAgenda.html', (req, res)=>{
//     res.render('medicoAgenda.html');
// })

// router.get('/medicoInfo.html', (req, res)=>{
//     res.render('medicoInfo.html');
// })

// router.get('/medicoLiberarAgenda.html', (req, res)=>{
//     res.render('medicoLiberarAgenda.html');
// })

// router.get('/medicoPrescripcion.html', (req, res)=>{
//     res.render('medicoPrescripcion.html');
// })

// router.get('/medicoSesion.html', (req, res)=>{
//     res.render('medicoSesion.html');
// })

// router.get('/registroAfiliadoB.html', (req, res)=>{
//     res.render('registroAfiliadoB.html');
// })

// router.get('/registroMedicos.html', (req, res)=>{
//     res.render('registroMedicos.html');
// })

// router.get('/afiliadoCitas.html/:e/:id', async(req, res)=>{
    
    //     //console.log(p.numDocumento);
    //     const especialidad = req.params.e
    //     const numcita = req.params.id
    //     console.log(numcita, especialidad);
    //     if (especialidad) {
    //         const ver = await conexionBD.query('SELECT * FROM cita c, diagnostico d, afiliado a WHERE c.k_idcita = d.k_idcita AND d.k_numerodocumentoafiliado = a.k_numerodocumentoafiliado AND c.n_especialidad = $1', [especialidad]);
    //         if (ver.rowCount === 0) {
    //             const respuesta1 = await conexionBD.query('INSERT INTO diagnostico (n_prescripcion, k_idcita, k_numerodocumentoafiliado, k_tipodocumentoafiliado) VALUES ($1, $2, $3, $4)', [" ", numcita, p.numDocumento, p.tipoDocumento]);
    //             console.log("HOLA");
    //             res.render('afiliadoCitas.html')
    //         }else{
    //             res.render('afiliadoSesion.html')
    //         }
    //         //
    //     }else{
    //         console.log("HOLA 2");
    //     }
    // })
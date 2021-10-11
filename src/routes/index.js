const express = require('express');
const router = express.Router();

//conexion bbddd
const conexionBD = require('../database/bd');

let cc;

router.post('/afiliadoSesion.html', async(req, res) =>{
    console.log("HOLA");
    const numDoc = req.body.numdoc;
    const tipoDoc = req.body.tipoDocumento ;
    const contraseña = req.body.contraseña;
    if (numDoc && tipoDoc && contraseña) {
        const respuesta = await conexionBD.query('SELECT * FROM afiliado WHERE k_numerodocumentoafiliado = $1', [numDoc]);
        const per = respuesta.rows[0];
        console.log(respuesta.rows);
        console.log(typeof per.k_numerodocumentoafiliado , '-----' , typeof contraseña);
        if (per.k_numerodocumentoafiliado.toString() === numDoc && per.k_numerodocumentoafiliado.toString() === contraseña) {
            console.log("SI");
            cc = per.k_numerodocumentoafiliado
            res.render('afiliadoSesion.html', {
                nombre: per.n_nombre.toUpperCase()+" "+per.n_apellido.toUpperCase()
            })
        }else{
            res.render('index.html')
        }
    }else{
        res.render('index.html')
    }
})

router.get('/afiliadoInfo.html', async(req, res)=>{
    const respuesta = await conexionBD.query('SELECT * FROM afiliado WHERE k_numerodocumentoafiliado = $1', [cc])
    const per = respuesta.rows[0];
    res.render('afiliadoInfo.html',{
        nombre: per.n_nombre.toUpperCase()+" "+per.n_apellido.toUpperCase()
    })
})

router.get('/index.html', async(req, res)=>{
    res.render('index.html')
})

router.get('/afiliadoSesion.html', async(req, res)=>{
    const respuesta = await conexionBD.query('SELECT * FROM afiliado WHERE k_numerodocumentoafiliado = $1', [cc])
    const per = respuesta.rows[0];
    res.render('afiliadoSesion.html',{
        nombre: per.n_nombre.toUpperCase()+" "+per.n_apellido.toUpperCase()
    })
})


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

// router.get('/afiliadoConsultaCitas.html', (req, res)=>{
//     res.render('afiliadoConsultaCitas.html');
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

module.exports = router;
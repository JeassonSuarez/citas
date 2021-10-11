const express = require('express');
const path = require('path');
const app = express();

//configuracion servidor
app.set('port', 3000);
app.use(express.urlencoded({extended: false}));
app.set('views', path.join(__dirname,'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
//middlewares


//rutas
app.use(require('./routes/afiliadoDAO'));


//archivos estaticos
app.use(express.static(path.join(__dirname,'public')));

//conexion bbddd
// const conexionBD = require('./database/bd');
// const getUsers = async(req, res)=>{
//     const response = await conexionBD.query('SELECT * FROM cliente');
//     //console.log(response.rows[0].k_rut);
//     //res.json(response.rows);
//     //res.send(response.rows)
// }
// getUsers();

// let cc;

// app.post('/afiliadoSesion.html', async(req, res) =>{
//     const numDoc = req.body.numdoc;
//     const tipoDoc = req.body.tipoDocumento ;
//     const contraseña = req.body.contraseña;
//     //console.log(numDoc+"DDD"+ tipoDoc+ "dsfs"+contraseña);
//     if (numDoc && tipoDoc && contraseña) {
//         const respuesta = await conexionBD.query('SELECT * FROM cliente WHERE k_rut = $1', [numDoc]);
//         //console.log(respuesta);
//         const per = respuesta.rows[0];
//         if (per.k_rut === numDoc && per.k_rut === contraseña) {
//             cc = per.k_rut
//             //console.log(cc);
//             res.render('afiliadoSesion.html', {
//                 nombre : per.n_nom_cliente
//             })
//         }else{
//             res.render('index.html')
//         }
//     }else{
//         res.render('index.html')
//     }
// })

// app.get('/afiliadoInfo.html', async(req, res)=>{
//     const respuesta = await conexionBD.query('SELECT * FROM cliente WHERE k_rut = $1', [cc])
//     const per = respuesta.rows[0];
//     res.render('afiliadoInfo.html',{
//         nombre: per.n_nom_cliente
//     })
//     console.log(per.n_nom_cliente);
//     // console.log(per.n_nom_cliente);
// })


//ejecutando el servidor
app.listen(app.get('port'));
console.log(`Servidor puerto ${app.get('port')}`);
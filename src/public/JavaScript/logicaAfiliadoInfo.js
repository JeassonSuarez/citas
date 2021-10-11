const infoAfiliado = {
    tipoDoc : "CC",
    numDoc : "1013680879",
    nombre : "jeasson suarez",
    fechaNacimiento : "17/04/1998",
    sexo : "Masculino",
    telefono : "3013840229",
    correo : "jass6@gmail.com",
    tipoAfiliacion : "cotizante",
    categoria : "A",
},
    $nombre = document.getElementById("nombre"),
    $tipoDoc = document.getElementById("tipoDoc"),
    $numDoc = document.getElementById("numDoc"),
    $fechaNacimiento = document.getElementById("fechaNacimiento"),
    $sexo = document.getElementById("sexo"),
    $telefono = document.getElementById("telefono"),
    $correo = document.getElementById("correo"),
    $tipoAfiliacion = document.getElementById("tipoAfiliacion"),
    $categoria = document.getElementById("categoria"),
    $nombreAfiliado = document.getElementById("nombreAfiliado");

if (window.location.pathname === "/afiliadoInfo.html") {
    $nombre.textContent = infoAfiliado.nombre;
    $tipoDoc.textContent = infoAfiliado.tipoDoc;
    $numDoc.textContent = infoAfiliado.numDoc;
    $fechaNacimiento.textContent = infoAfiliado.fechaNacimiento;
    $sexo.textContent = infoAfiliado.sexo;
    $telefono.textContent = infoAfiliado.telefono;
    $correo.textContent = infoAfiliado.correo;
    $tipoAfiliacion.textContent = infoAfiliado.tipoAfiliacion;
    $categoria.textContent = infoAfiliado.categoria;
    $nombreAfiliado.textContent = infoAfiliado.nombre.toUpperCase();
}

$nombreAfiliado.textContent = infoAfiliado.nombre.toUpperCase();
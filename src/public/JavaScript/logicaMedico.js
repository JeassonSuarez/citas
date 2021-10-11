
const infoMedico = {
        tipoDoc : "Cedula",
        numDoc : "1000270388",
        nombre : "javier pelaez",
        fechaNacimiento : "17/04/1990",
        sexo : "Masculino",
        telefono : "3013840229",
        correo : "javier@gmail.com",
        especialidad : "Neurologo",
        sede : "tunja",
        dirSede : "Calle 50 #72 - 24",
        telSede : "3783279",
        idConsultorio : "P3-09",
    },
    $nombre = document.getElementById("nombre"),
    $tipoDoc = document.getElementById("tipoDoc"),
    $numDoc = document.getElementById("numDoc"),
    $fechaNacimiento = document.getElementById("fechaNacimiento"),
    $sexo = document.getElementById("sexo"),
    $telefono = document.getElementById("telefono"),
    $correo = document.getElementById("correo"),
    $nombreMedico = document.getElementById("nombreMedico"),
    $especialidad = document.getElementById("especialidad"),
    $sede = document.getElementById("sede"),
    $dirSede = document.getElementById("dirSede"),
    $telSede = document.getElementById("telSede"),
    $idConsultorio = document.getElementById("consultorio");

if (window.location.pathname === "/medicoInfo.html") {
    $nombre.textContent = infoMedico.nombre;
    $tipoDoc.textContent = infoMedico.tipoDoc;
    $numDoc.textContent = infoMedico.numDoc;
    $fechaNacimiento.textContent = infoMedico.fechaNacimiento;
    $sexo.textContent = infoMedico.sexo;
    $telefono.textContent = infoMedico.telefono;
    $correo.textContent = infoMedico.correo;
    $nombreMedico.textContent = infoMedico.nombre;
    $especialidad.textContent = infoMedico.especialidad;
    $sede.textContent = infoMedico.sede;
    $dirSede.textContent = infoMedico.dirSede;
    $telSede.textContent = infoMedico.telSede;
    $idConsultorio.textContent = infoMedico.idConsultorio;
}

$nombreMedico.textContent = infoMedico.nombre.toUpperCase();

if (window.location.pathname === "/medicoAgenda.html") {

    const $agenda = document.querySelector(".section__div-agenda"),
    $templateAgenda = document.getElementById("template-agenda").content,
    $fragmentoAgenda = document.createDocumentFragment(),
    agenda = [
        {
            tipo: "Medicina interna",
            fecha: "12/04/1998 - 09:30 AM",
            nombreAfiliado: "Jesus Benitez",
            sede: "Chapinero",
            consultorio: "P2 - 04",
            direccion: "Diagonal 15 #72 - 25",

        },{
            tipo: "Medicina interna",
            fecha: "12/04/1998 - 09:30 AM",
            nombreAfiliado: "Jesus Benitez",
            sede: "Chapinero",
            consultorio: "P2 - 04",
            direccion: "Diagonal 15 #72 - 25",
        },{
            tipo: "Medicina interna",
            fecha: "12/04/1998 - 09:30 AM",
            nombreAfiliado: "Jesus Benitez",
            sede: "Chapinero",
            consultorio: "P2 - 04",
            direccion: "Diagonal 15 #72 - 25",
        }
    ];

    agenda.forEach(element => {
        $templateAgenda.getElementById("tipoCita").textContent = element.tipo;
        $templateAgenda.getElementById("fecha").textContent = element.fecha
        $templateAgenda.getElementById("nombreAfiliado").textContent = element.nombreAfiliado
        $templateAgenda.getElementById("sede").textContent  = element.sede
        $templateAgenda.getElementById("consultorio").textContent   =  element.consultorio
        $templateAgenda.getElementById("direccion").textContent = element.direccion
    
        const $clone = document.importNode($templateAgenda, true)
        $fragmentoAgenda.appendChild($clone)
    });

    $agenda.appendChild($fragmentoAgenda)

}


if (window.location.pathname === "/medicoLiberarAgenda.html") {
    const $nuevosEspacios = document.querySelector(".section__div-crearEspacios"),
        $templateNuevosEspacios = document.getElementById("template-nuevoEspacio").content,
        $fragmentoNuevosEspacios = document.createDocumentFragment(),
        $crearEspacios = document.getElementById("liberarEspacios"),
        nuevosEspacios=[];
        let fechaActual = new Date();
        fechaActual.setMonth(fechaActual.getMonth()+1)
    $crearEspacios.addEventListener("click", ()=>{
        
        
        let anio = fechaActual.getFullYear(),
        mes = fechaActual.getMonth()+1
        diasMes = new Date(anio, mes, 0).getDate();
        //console.log(mes);
        for (let dia = 1; dia <=diasMes; dia++) {
            fechaActual.setDate(dia)
            //console.log(fechaActual.getDate());
            for (let horaCita = 7; horaCita < 15; horaCita++) {
                nuevosEspacios.push(` ${fechaActual.getFullYear()} / ${fechaActual.getMonth()+1} / ${fechaActual.getDate()} --- ${horaCita}:00`);
            } 
        }

        console.log(fechaActual.getMonth());
        //console.log(nuevosEspacios);
        nuevosEspacios.forEach(element => {
            //console.log(element);
            $templateNuevosEspacios.getElementById("fecha").textContent = element
            const $cloneNuevaCita = document.importNode($templateNuevosEspacios, true)
            $fragmentoNuevosEspacios.appendChild($cloneNuevaCita)
        });

        $nuevosEspacios.appendChild($fragmentoNuevosEspacios)
     })
}

// 0   enero
// 1   febrero
// 2   marzo
// 3   abril
// 4   mayo
// 5   junio
// 6   julio
// 7   agosto
// 8   septiembre
// 9   octubre
// 10  nov
// 11  dic

if (window.location.pathname === "/medicoPrescripcion.html") {
    const $aniadirItem = document.querySelector(".input-aniadir"),
        $datosPrescripcion = document.querySelector(".div__datos-tratamiento");

    $datosPrescripcion.style.setProperty("display", "none")

    $aniadirItem.addEventListener("click", ()=>{
        $datosPrescripcion.style.setProperty("display", "grid")
    })
    
    const    $btnInsertar = document.getElementById("btnInsertarItem");

    $btnInsertar.addEventListener("click", ()=>{
        const $item = document.querySelector(".div__prescripcion"),
        $templateItem = document.querySelector(".template-prescripcion").content,
        $itemFragmento = document.createDocumentFragment(),
        $descripcion = document.getElementById("input-descripcion"),
        $presentacion = document.getElementById("input-presentacion"),
        $cantidad = document.getElementById("input-cantidad"),
        $duracion = document.getElementById("input-duracionTratamiento"),
        $posologia = document.getElementById("input-posologia");
        
        console.log($duracion);
        if ($descripcion.value === "" ||$presentacion.value === "" ||$cantidad.value === "" ||$duracion.value === "" ||$posologia.value === "" ) {
            alert("Debe ingresar los datos requeridos")
        }else{
            $templateItem.getElementById("descripcion").textContent = $descripcion.value
            $templateItem.getElementById("presentacion").textContent = $presentacion.value
            $templateItem.getElementById("cantidad").textContent = $cantidad.value
            $templateItem.getElementById("duracion").textContent = $duracion.value
            $templateItem.getElementById("posologia").textContent = $posologia.value
            $clonItem = document.importNode($templateItem, true)
            $itemFragmento.appendChild($clonItem)
            $item.appendChild($itemFragmento)
            

            $descripcion.value = ""
            $presentacion.value = ""
            $cantidad.value = ""
            $duracion.value = ""
            $posologia.value = ""
            $datosPrescripcion.style.setProperty("display", "none")
        }
    })
}




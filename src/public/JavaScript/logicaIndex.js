// class Usuario {
//     constructor(numCedula = "", contraseña = "", tipoDoc = "") {
//         this.numCedula = numCedula;
//         this.contraseña = contraseña;
//         this.tipoDoc = tipoDoc;
//     }
// }

// fetch("JSON/sesionAdmn.json")
    // .then(res => (res.ok ? res.json() : Promise.reject(res)))
    // .then(json => {
    //     json.forEach(element => {
    //         if (element.numDocumento === $usuario && element.contraseña === $contraseña && element.tipoDocumento === $tipo ) {
    //             administrador = new Usuario(element.numDocumento, element.contraseña, element.tipoDocumento);
    //             alert(administrador.numCedula)
    //         };
    //     });
    // })
    // .catch(error => {
    //     let message = error.statusText || "Ocurrio un error"
    //     $fetch.innerHTML = `Error ${error.status}: ${message}`});



const $enviar = document.querySelector(".enviar");

$enviar.addEventListener("click", function(e){
    const $usuario = document.getElementById("cedula").value,
    $contraseña = document.getElementById("contraseña").value,
    $tipo=document.getElementById("tipo").value;

    const administrador = {
        tipoDocumento : "Cedula de ciudadania",
        numeroDocumento : "1",
        contraseña : "12345"
    }, medico= {
        tipoDocumento : "Cedula de ciudadania",
        numeroDocumento : "2",
        contraseña : "12345"
    }, afiliado= {
        tipoDocumento : "Cedula de ciudadania",
        numeroDocumento : "3",
        contraseña : "12345"
    }

    console.log($tipo);

    console.log(administrador.contraseña);
    console.log(typeof($usuario));
    $form = document.querySelector(".container__form");
    if ($tipo === administrador.tipoDocumento && $usuario === administrador.numeroDocumento && $contraseña === administrador.contraseña) {
        $form.setAttribute("action", "admin.html")
    }else if ($tipo === medico.tipoDocumento && $usuario === medico.numeroDocumento && $contraseña === medico.contraseña) {
        $form.setAttribute("action", "medicoSesion.html")
    }else if ($tipo === afiliado.tipoDocumento && $usuario === afiliado.numeroDocumento && $contraseña === afiliado.contraseña) {
        $form.setAttribute("action", "afiliadoSesion.html")
    }else{
        console.log("No esta registrado");
    }

});








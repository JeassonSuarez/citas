const $citas = document.querySelector(".section__div-citas"),
    $templateCita = document.getElementById("template-cita").content,
    $fragmento = document.createDocumentFragment(),
    citasObjeto = [
    {
        fecha : "2021/01/05",
        nombreMedico : "Jeasson Suarez",
        sede:"Bogota - La candelaria",
        direccion : "transversal 41a # 70c - 78 sur",
    },
    {
        fecha : "2021/01/05",
        nombreMedico : "Jeasson Suarez",
        sede:"Bogota - La candelaria",
        direccion : "transversal 41a # 70c - 78 sur",
    },
    {
        fecha : "2021/01/05",
        nombreMedico : "Jeasson Suarez",
        sede:"Bogota - La candelaria",
        direccion : "transversal 41a # 70c - 78 sur",
    },
];

citasObjeto.forEach(Element => {
    $templateCita.getElementById("fecha").textContent = Element.fecha;
    $templateCita.getElementById("nombreMedico").textContent = Element.nombreMedico;
    $templateCita.getElementById("sede").textContent = Element.sede;
    $templateCita.getElementById("direccion").textContent = Element.direccion;
    const $clone = document.importNode($templateCita, true)
    $fragmento.appendChild($clone)
});



$citas.appendChild($fragmento);
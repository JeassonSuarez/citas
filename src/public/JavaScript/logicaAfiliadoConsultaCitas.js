const $citasConsulta = document.querySelector(".section__div-citasConsulta"),
    $templateCitaConsulta = document.getElementById("template-citaConsulta").content,
    $fragmentoConsulta = document.createDocumentFragment(),
    citasObjetoConsulta = [
        {   
            tipo : "Medicina general",
            fecha : "2021/01/05",
            nombreMedico : "Jeasson Suarez",
            sede:"Bogota - La candelaria",
            direccion : "transversal 41a # 70c - 78 sur",
        },
        {
            tipo : "Medicina general",
            fecha : "2021/01/05",
            nombreMedico : "Jeasson Suarez",
            sede:"Bogota - La candelaria",
            direccion : "transversal 41a # 70c - 78 sur",
        },
        {
            tipo : "medicina general",
            fecha : "2021/01/05",
            nombreMedico : "Jeasson Suarez",
            sede:"Bogota - La candelaria",
            direccion : "transversal 41a # 70c - 78 sur",
        },
    ];

citasObjetoConsulta.forEach(Element => {
    $templateCitaConsulta.getElementById("tipoCita").textContent = Element.tipo;
    $templateCitaConsulta.getElementById("fecha").textContent = Element.fecha;
    $templateCitaConsulta.getElementById("nombreMedico").textContent = Element.nombreMedico;
    $templateCitaConsulta.getElementById("sede").textContent = Element.sede;
    $templateCitaConsulta.getElementById("direccion").textContent = Element.direccion;
    const $clone = document.importNode($templateCitaConsulta, true)
    $fragmentoConsulta.appendChild($clone)
});



$citasConsulta.appendChild($fragmentoConsulta);
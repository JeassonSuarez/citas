class Cita{
    constructor (fechaDisponible, nombreM, apellidoM, especialidad, dir, idcita){
        this.fecha = fechaDisponible;
        this.nombreM  = nombreM;
        this.apellidoM = apellidoM;
        this.especialidad = especialidad;
        this.dir = dir;
        this.idcita = idcita;
    }
}

module.exports = Cita;
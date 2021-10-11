class Afiliado{
    constructor (nombre, apellido, tipoDocumento, numDocumento, correo, tipoAfiliacion, fNacimiento, sexo, estado, telefonoCon, categoria, tipDocResponsable, numDocResponsable){
        this.nombre = nombre;
        this.apellido = apellido;
        this.tipoDocumento = tipoDocumento;
        this.numDocumento = numDocumento;
        this.correo = correo;
        this.tipoAfiliacion = tipoAfiliacion;
        this.fNacimiento = fNacimiento;
        this.sexo = sexo;
        this.estado = estado;
        this.telefonoCon = telefonoCon;
        this.categoria = categoria;
        this.tipDocResponsable = tipDocResponsable;
        this.numDocResponsable = numDocResponsable;
    }
}

module.exports = Afiliado;
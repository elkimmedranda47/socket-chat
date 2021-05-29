class Usuarios {


    constructor() {
        this.personas = [];
    }

    agregarPersonas(id, nombre, sala) {

        let persona = { id, nombre, sala }

        this.personas.push(persona);

        return this.personas;
    }
    getPersona(id) {

        //console.log('Arreglo actual--->', this.personas);
        let persona = this.personas.filter(persona => persona.id === id)[0];
        return persona
    }

    getPersonas() { return this.personas }

    getPersonaSala(sala) {
        let personaSala = this.personas.filter(persona => persona.sala === sala);
        return personaSala;
    }

    borrarPersona(id) {

        let personaBorrada = this.getPersona(id);

        this.personas = this.personas.filter(item => item.id != id);

        return personaBorrada;
    }


}


module.exports = {
    Usuarios
}
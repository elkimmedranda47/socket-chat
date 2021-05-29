const { io } = require('../server');

const { Usuarios } = require('../classes/usuarios');

const { crearMensaje } = require('../utilidades/utilidades');


const usuarios = new Usuarios();

io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) => {

        if (!data.nombre || !data.sala) {

            return callback({
                error: true,
                mensaje: 'el nombre/sala es necesario'
            })
        }




        let personas = usuarios.agregarPersonas(client.id, data.nombre, data.sala);

        client.join(data.sala);
        //enviar a los clientes cuantos usuarios hay conectados en la sala
        client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonaSala(data.sala));


        //cuantos usuarios hay conetados hay en la sala
        callback(usuarios.getPersonaSala(data.sala));




    });

    //cliente evia mensaje , servidor recive, servidor envia a todos.
    client.on('crearMensaje', (data) => {
        let persona = usuarios.getPersona(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);


        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
    });






    client.on('disconnect', () => {


        let personaBorrada = usuarios.borrarPersona(client.id);


        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} salio`));

        client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonaSala(personaBorrada.sala));

    });




    //escuchar mensaje de cliente x, enviar mensaje a cliente x
    client.on('mensajePrivado', (data) => {

        let persona = usuarios.getPersona(client.id);

        let mensaje = crearMensaje(persona.nombre, data.mensaje);

        client.broadcast.to(data.para).emit('mensajePrivado', mensaje);

    });


});
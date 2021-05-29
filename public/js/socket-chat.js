// io es = a la variable io del server deben de tener el mismo nombre

var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El Nombre y la Sala necesario');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala'),
}


socket.on('connect', function() {

    console.log('Conectado al server');

    socket.emit('entrarChat', usuario, function(resp) {

        console.log('Usuarios conectados--->', resp);


    });
});

//escuchar exit conexion
socket.on('disconnect', function() {
    console.log('Perdimos conexion con el server');
});


// Escuhcar un mensaje de toda la sala,  Que persona de Desconecto, Escuhcar un mensaje privados
socket.on('crearMensaje', function(mensaje) {
    console.log('Servidor: ', mensaje);
});

// cuantos usuarios hay conectado en la sala
socket.on('listaPersona', function(personas) {
    console.log('|--->', personas);
});


//Mensaje privados
socket.on('mensajePrivado', function(mensaje) {
    console.log('Mensaje Privado', mensaje);
});
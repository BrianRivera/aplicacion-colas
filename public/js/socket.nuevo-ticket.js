//comando para establecer la comunicacion

var socket = io();
var label = $('#lblNuevoTicket');
socket.on('connect', function() {
    console.log('conectado al servidor');

});

socket.on('disconnect', function() {
    console.log('desconectado al servidor');

});

socket.on('estadoActual', function(mensaje) {
    label.text(mensaje.actual);
})


$('button').on('click', function() {

    //el null representa que no se le esta enviando ningun parametro
    //y la siguiente funcion es lo que se ejecuta despues y la variable
    //representa la respuesta que dio el servidor al ejecutar el sockete
    socket.emit('siguienteTicket', null, function(siquienteTickuet) {
        label.text(siquienteTickuet);
    });

});
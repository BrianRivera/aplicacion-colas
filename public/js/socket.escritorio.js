//comando para establecer la comunicacion

var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('el escritorio es nesesario');
}

var escritorio = searchParams.get('escritorio');
var label = $('small');

$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {

        if (resp.ok === false) {
            alert(resp.err.message);
            label.text(resp.err.message);
            return;
        }

        label.text('Ticket ' + resp.numero)

    });
});
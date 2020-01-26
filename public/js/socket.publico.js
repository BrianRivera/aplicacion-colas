var socket = io();


var lblTicket1 = $('#lblTicket1')
var lblTicket2 = $('#lblTicket2')
var lblTicket3 = $('#lblTicket3')
var lblTicket4 = $('#lblTicket4')

var lbEscitorio1 = $('#lblEscritorio1')
var lbEscitorio2 = $('#lblEscritorio2')
var lbEscitorio3 = $('#lblEscritorio3')
var lbEscitorio4 = $('#lblEscritorio4')

var lblTikets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblscitorio = [lbEscitorio1, lbEscitorio2, lbEscitorio3, lbEscitorio4];

socket.on('estadoActual', function(data) {
    console.log(data.ultimos4);
    actualizaHTML(data.ultimos4);

});

socket.on('ultimos4', async function(data) {
    var audio = new Audio('audio/new-ticket.mp3');
    //C:\Users\Brian\Desktop\node\09-socket-colas\public\audio
    await audio.play()
    actualizaHTML(data.ultimos4);
});

function actualizaHTML(ultimos4) {

    for (let i = 0; i < ultimos4.length; i++) {
        lblTikets[i].text('Ticket ' + ultimos4[i].numero);
        lblscitorio[i].text('Escritorio ' + ultimos4[i].escritorio);

    }

}
const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control')

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente();
        callback(siguiente);
    });

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });


    client.on('atenderTicket', (data, callback) => {
        console.log('asdsdd');

        if (!data.escritorio) {
            return callback({
                ok: false,
                message: 'el escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio)

        callback(atenderTicket);

        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });

    });


    // client.broadcast.emit('ultimos4', {}, () => {

    // });

});
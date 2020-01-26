const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}


class TicketControl {

    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo();
        }

    }


    siguiente() {
        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Ticket ${ this.ultimo}`;
    }

    getUltimoTicket() {
        return `Ticket ${ this.ultimo}`;
    }

    getUltimos4() {
        return this.ultimos4;
    }

    atenderTicket(escritorio) {
        //recivo el numero dle escritorio

        //compruebo si hay tockets que atender
        if (this.tickets.length === 0) {
            return {
                ok: false,
                err: {
                    message: 'no hay tickets'
                }
            }
        }
        //extraer el numeor para romper la relacion de javascript para el problema de que todos
        //los objetos son pasados por referencias
        let numeroTicket = this.tickets[0].numero;
        //elimino la primera posicion del arreglo
        this.tickets.shift();
        //crea el ticket que atenderas
        let atenderTicket = new Ticket(numeroTicket, escritorio);

        //agregar el ticket al inicio del arreglo
        this.ultimos4.unshift(atenderTicket);

        //verificar cantidad de tiket en arreglo

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1);
        }

        console.log('Ultimos 4');
        console.log(this.ultimos4);

        //guardar y retornar
        this.grabarArchivo();

        return atenderTicket;

    }


    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        this.grabarArchivo();
    }


    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }

}


module.exports = {
    TicketControl
}
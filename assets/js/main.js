const { createApp } = Vue
const DateTime = luxon.DateTime;
createApp({
  data() {
    return {
        textToFilterContacts: '',
        receivedMessageInterval: null,
        textoToSend: '',
        activeChat: 0,
        contacts: [
            {
                name: 'Michele',
                avatar: './assets/img/avatar_1.jpg',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent',
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Ricordati di stendere i panni',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received'
                    },
                ],
            },

            {
                name: 'Fabio',
                avatar: './assets/img/avatar_2.jpg',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        message: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    },
                ],
            },

            {
                name: 'Samuele',
                avatar: './assets/img/avatar_3.jpg',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        message: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        message: 'Ah scusa!',
                        status: 'received'
                    },
                ],
            },

            {
                name: 'Alessandro B.',
                avatar: './assets/img/avatar_4.jpg',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    },
                ],
            },

            {
                name: 'Alessandro L.',
                avatar: './assets/img/avatar_5.jpg',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ricordati di chiamare la nonna',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Va bene, stasera la sento',
                        status: 'received'
                    },
                ],
            },

            {
                name: 'Claudia',
                avatar: './assets/img/avatar_6.jpg',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao Claudia, hai novità?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Non ancora',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'Nessuna nuova, buona nuova',
                        status: 'sent'
                    },
                ],
            },
            
            {
                name: 'Federico',
                avatar: './assets/img/avatar_7.jpg',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Fai gli auguri a Martina che è il suo compleanno!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Grazie per avermelo ricordato, le scrivo subito!',
                        status: 'received'
                    },
                ],
            },

            {
                name: 'Davide',
                avatar: './assets/img/avatar_8.jpg',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao, andiamo a mangiare la pizza stasera?',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'OK!!',
                        status: 'received'
                    }
                ],
            }

        ]

    }
  },
  methods: {
    //funzione che cambia la chat principare a destra
    chatChange(index){
        this.activeChat = index;
    },
    //funzione che permette di mandare e visualizzare il messaggio dell'utente in chat (avviene anche la formattazione della data)
    sendMessage(activeChat){
        if(this.textoToSend.length !== 0){
            clearInterval(this.receivedMessageInterval)
            this.contacts[activeChat].messages.push(
                {
                    date: DateTime.local().toFormat('T'),
                    message: this.textoToSend,
                    status: 'sent',
                }
            )
            this.textoToSend = '';

            this.receivedMessageInterval = setInterval(() => {
                this.contacts[activeChat].messages.push(
                    {
                        date: DateTime.local().toFormat('T'),
                        message: 'ok!',
                        status: 'received',
                    }
                )
                clearInterval(this.receivedMessageInterval)
            }, 1000);
        }
    },
    //funzione che mostra l'orario o il messaggio nella parte sinistra delle chat, in base al paramentro passato dall'utente
    textOrDateDisplay(string, index){
        const arr = this.contacts[index].messages;
        const lastItem = arr[arr.length - 1]; 
        if(arr.length > 0 ){
            if(string === 'date'){
                return lastItem.date;
            }else{
                return lastItem.message;
            }
        }else{            
            return ''
        }
    },
    //funzione che inverte il parametro di "visible" in base alla presenza di queste nel campo "name" di ogni elemento dell'array
    filterContacts(){
        this.contacts.forEach(element => {
            if(!element.name.toLowerCase().includes(this.textToFilterContacts.toLowerCase())){
                return element.visible = false
            }else{
                return element.visible = true
            }
        });
    },
    //funzione che permette di cancellare i messaggi
    deleteMessagge(textIndex){
        this.contacts[this.activeChat].messages.splice(textIndex, 1)
    }

  },

}).mount('#app')
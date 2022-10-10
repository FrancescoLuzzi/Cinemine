# Cinemine

Cinemine web pages:

- CasaDiDistribuzione:<br />
  Possiedono film di cui possono dare i permessi ai cinema li richiedono, questi possono essere la sola visione al cinema o anche il noleggio online.
  Questi permessi si possono anche revocare e si possono aggiungere anche altri film.

- Cinema:<br />
  Possono creare sale cinematografiche scegliendone la forma e la struttura.
  Possono creare/modificare/eliminare delle programmazioni per i film di cui hanno i permessi.
  Possono aggiungere politiche di vendita per i biglietti (Intero e Ridotto)

- Utente:<br />
  Possono prenotare dei posti a seconda del tipo di biglietto Intero/Ridotto.
  Possono noleggiare lo streaming online.

- AddettoSicurezza:<br />
  Controlla i log degli utenti e blocca/sblocca gli account di Utenti, Cinema e CDD

# How to

Diversi account disponibili per il login:

- Cinema, password qualsiasi, si possono aggiugnere nuove programmazioni, aggiungere o modificare sale cinema, aggiungere nuovi film alle programmazioni (di quelli messi a disposizione dalla Casa di Distribuzione) e cambiare il prezzo dei propri biglietti interi e ridotti.
- CasaDiDistribuzione, password qualsiasi, si possono aggiungere nuovi film al proprio database e si possono dare i permessi di vendita ai Cinema.
- User, password "aaa", si possono prenotare biglietti o noleggi online, oppure annullare tali prenotazioni, se si sbaglia per 5 volte il login si blocca l'account e può essere sbloccato solo dall'addetto alla sicurezza.
- AddettoSicurezza, password qualsiasi, può guardare i log degli eventi di tutti gli utenti della piattaforma e bloccare/sbloccare gli account di User, Cinema e CasaDiDistribuzione.

# Gestione dati

I dati sono gestiti da file JS all'interno della cartella DB

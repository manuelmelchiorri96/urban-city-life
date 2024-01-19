# UrbanCityLife

## Panoramica

L'applicazione si concentra sullo sviluppo urbano e si integra con la piattaforma GoRest per fornire funzionalità di gestione degli utenti, post e commenti. Le principali funzionalità includono:

## Login e Registrazione

L'applicazione offre la possibilità agli utenti di autenticarsi o registrarsi tramite la piattaforma GoRest. Ecco alcuni dettagli specifici riguardo a questa funzionalità:

### Form di Login

Il form di login richiede l'autenticazione attraverso la piattaforma GoRest. Per completare con successo il processo di login, è necessario fornire sia il token di registrazione che il token di login. Questi token possono essere ottenuti tramite l'autenticazione su [https://gorest.co.in/consumer/login](https://gorest.co.in/consumer/login).

### Registrazione

Il processo di registrazione richiede anche l'autenticazione su [https://gorest.co.in/consumer/login](https://gorest.co.in/consumer/login) per ottenere il token di registrazione. Questo token è essenziale per completare con successo la registrazione.

Per ottenere il token di registrazione:

1. Autenticarsi su [https://gorest.co.in/consumer/login](https://gorest.co.in/consumer/login) tramite Google, Github o Microsoft.
2. Utilizzare il token ottenuto durante l'autenticazione per completare il processo di registrazione nell'applicazione.

## Pagina Utenti

La pagina degli utenti offre una visione completa di tutti gli utenti disponibili, consentendo agli utenti di effettuare ricerche per filtrare la lista in base a diversi criteri come email, nome, status o genere.

### Visualizzazione Utenti

La pagina mostra una lista dettagliata di tutti gli utenti registrati. Ogni utente nella lista presenta informazioni chiave come email, nome, status e genere.

### Ricerca Utenti

Per semplificare la ricerca degli utenti, la pagina fornisce un input di ricerca. Gli utenti possono utilizzare questo input per filtrare la lista in base ai seguenti criteri:

- **Email**
- **Nome**
- **Status**
- **Genere**

### Istruzioni per la Ricerca

Per effettuare una ricerca:

1. Accedi alla pagina degli utenti.
2. Utilizza l'input di ricerca per inserire i criteri desiderati (email, nome, status, genere).
3. La lista degli utenti sarà automaticamente filtrata in base ai criteri inseriti.

### Esempi di Ricerca

- Per trovare un utente specifico per email, inserisci l'email desiderata nell'input di ricerca.
- Per visualizzare tutti gli utenti con un determinato nome, inserisci il nome nell'input di ricerca.
- Per filtrare gli utenti per status (attivo o inattivo), inserisci lo status nell'input di ricerca.
- Per cercare utenti per genere, inserisci il genere nell'input di ricerca.

Questo approccio offre un modo efficiente e user-friendly per esplorare e cercare utenti sulla piattaforma.

### Pagina Account

Gli utenti possono accedere alla propria pagina account per apportare modifiche personali o eliminare il proprio account. Le funzionalità includono:

- **Modifica del Profilo:**

  - Gli utenti possono modificare il proprio nome, email, genere o stato direttamente dalla pagina account.

- **Eliminazione dell'Account:**
  - Gli utenti hanno la possibilità di eliminare il proprio account tramite un'apposito pulsante sulla pagina account.

### Istruzioni per la Modifica e l'Eliminazione

Per modificare le informazioni del tuo account o eliminare l'account:

1. Accedi alla tua pagina account.
2. Utilizza le opzioni fornite per modificare il tuo nome, email, genere o stato.
3. Per eliminare il tuo account, utilizza l'apposito pulsante di eliminazione e conferma l'operazione quando richiesto.

Questo approccio garantisce che gli utenti possano gestire facilmente le proprie informazioni personali e l'account sulla piattaforma.

## Dashboard

La dashboard fornisce una panoramica di tutti i post presi da tutti gli utenti esistenti sulla piattaforma. Gli utenti possono interagire con i post in vari modi.

### Visualizzazione dei Post

La dashboard mostra una lista completa di tutti i post effettuati dagli utenti registrati. Ogni post include informazioni come il contenuto del post, l'autore, la data di pubblicazione e il numero di commenti e "Mi Piace".

### Interazione con i Post

Gli utenti possono interagire con i post in diversi modi:

- **Commentare un Post:**

  - Gli utenti possono commentare i post direttamente dalla dashboard, fornendo feedback o avviando discussioni.

- **Fare un Nuovo Post:**

  - Gli utenti possono creare nuovi post direttamente dalla dashboard per condividere contenuti o informazioni con la community.

- **"Mi Piace" a un Post:**

  - La funzionalità di "Mi Piace" è disponibile solo lato front-end, quindi viene solamente colorato diversamente il button.

- **Modifica Post:**

  - La funzionalità di modifica post non è disponibile.

- **Elimina Post:**
  - La funzionalità di elimina post non è disponibile.

### Istruzioni per l'Interazione

Per interagire con i post sulla dashboard:

1. Scorri la lista dei post per visualizzare tutti i contenuti disponibili.
2. Commenta un post utilizzando l'apposito campo di commento.
3. Crea un nuovo post utilizzando il textarea "Nuovo Post".

## Guida di Installazione

Per iniziare con il progetto, seguire questi passaggi:

1. Clonare il repository sul proprio sistema locale.
2. Eseguire `npm install` per installare le dipendenze.
3. Configurare l'ambiente locale, se necessario.
4. Eseguire `ng serve` per avviare l'applicazione in modalità sviluppo.
5. Aprire il browser e accedere a [http://localhost:4200/](http://localhost:4200/).

## Struttura del Progetto

Il progetto è strutturato in modo seguente:

- `src/`: Contiene il codice sorgente dell'applicazione.
  - `app/`: Contiene i componenti, i servizi e i moduli dell'app.
  - `assets/`: Contiene risorse come immagini e file statici.
- `node_modules/`: Contiene le dipendenze del progetto.
- `angular.json`: File di configurazione per Angular CLI.
- `package.json`: File di configurazione per le dipendenze del progetto.

## Risoluzione dei Problemi Comuni

### Problema: L'applicazione non si avvia correttamente

- **Soluzione:** Assicurarsi di aver eseguito `npm install` per installare le dipendenze. Controllare la console per eventuali errori durante l'avvio.

## API Endpoints

L'applicazione si interfaccia con l'API di GoRest per fornire funzionalità di gestione degli utenti e dei post. Di seguito sono elencati gli endpoints principali forniti dalla classe `HttpService`:

### Autenticazione

- **Registra un nuovo utente:**
  - Metodo: `POST`
  - Endpoint: `/v2/users`
  - Descrizione: Registra un nuovo utente.

### Profilo Utente

- **Trova tutti gli utenti:**

  - Metodo: `GET`
  - Endpoint: `/v2/users`
  - Descrizione: Ottiene le informazioni di tutti gli utenti.

- **Elimina un utente:**

  - Metodo: `DELETE`
  - Endpoint: `/v2/users/:userId`
  - Descrizione: Cancella un utente dato il suo ID.

- **Modifica il profilo utente:**
  - Metodo: `PUT`
  - Endpoint: `/v2/users/:userId`
  - Descrizione: Modifica il profilo di un utente.

### Post

- **Trova tutti i post:**

  - Metodo: `GET`
  - Endpoint: `/v2/posts`
  - Descrizione: Ottiene le informazioni di tutti i post.

- **Trova i post di un utente:**

  - Metodo: `GET`
  - Endpoint: `/v2/users/:userId/posts`
  - Descrizione: Ottiene i post di un utente dato il suo ID.

- **Aggiungi un nuovo post:**

  - Metodo: `POST`
  - Endpoint: `/v2/users/:userId/posts`
  - Descrizione: Aggiunge un nuovo post per un utente specifico.

- **Commenta un post:**

  - Metodo: `POST`
  - Endpoint: `/v2/posts/:postId/comments`
  - Descrizione: Aggiunge un commento a un post.

- **Leggi i commenti di un post:**
  - Metodo: `GET`
  - Endpoint: `/v2/posts/:postId/comments`
  - Descrizione: Ottiene i commenti di un post dato il suo ID.

Questo progetto è stato generato con la versione 16.2.8. [Angular CLI](https://github.com/angular/angular-cli)

## Licenza

Questo progetto è distribuito sotto la [GNU General Public License v3.0](./LICENSE). Vedere il file `LICENSE` per ulteriori informazioni.

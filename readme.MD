# Passport Local Example

This is a project that showcases how to setup passport js on the server with session validating specific routes when called from the client. 

## Relevant Packages

* `passport: ^1.0.4`
* `passport-local: ^1.0.0`
* `express-session: ^1.17.1`

## Setup

You will need a `.env` file inside of `server/` to begin. Inside of this file you will want the following variables:

```
HOST=<HEROKU_POSTGRES_DB_HOST>
DATABASE=<HEROKU_POSTGRES_DB_NAME>
USER=<HEROKU_POSTGRES_DB_USER>
DB_PORT=5432 // this will almost always be the same port across most postgres dbs
PASSWORD=<HEROKU_POSTGRES_DB_PASSWORD>
URI=<HEROKU_POSTGRES_DB_URI>
```

After setting up these variables, run in one terminal

`cd server && npm install && npm start`

and in another terminal

`cd client && npm install && npm start`
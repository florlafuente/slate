const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

require('dotenv').config()
const dev = process.env.NODE_ENV !== 'production';
const next = require('next');
const pathMatch = require('path-match');
const app = next({ dev });
const handle = app.getRequestHandler();
const { parse } = require('url');
const MONGO_URL = process.env.MONGO_URL
const dbName = 'testing'
const routes = require('./server/router.js');

app.prepare().then( async () => {
try{
  console.log(`Connecting to ${MONGO_URL}`)
  const client = await MongoClient.connect(MONGO_URL,{ useNewUrlParser: true })
  const db = client.db(dbName);
  const server = express();

  server.use(bodyParser.json());
  // server.use(bodyParser.urlencoded({ extended: true }))
  server.use(session({
    secret: 'holis-carolis',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
  }));

  server.use((req, res, next) => {
    // Also expose the MongoDB database handle so Next.js can access it.
    req.db = db
    next()
  })

  server.use('/api', routes);

  // Server-side
  const route = pathMatch();

  // server.get('/search', (req, res) => {
  //   return app.render(req, res, '/search', req.query);
  // });

  // server.get('/artist/:id', (req, res) => {
  //   const params = route('/artist/:id')(parse(req.url).pathname);
  //   return app.render(req, res, '/artist', params);
  // });

  // server.get('/album/:id', (req, res) => {
  //   const params = route('/album/:id')(parse(req.url).pathname);
  //   return app.render(req, res, '/album', params);
  // });

  server.get('*', (req, res) => { 
    return handle(req, res);
  });

  /* eslint-disable no-console */
  return server.listen(3000, (err) => {
    if (err) throw err;
    console.log('Server ready on http://localhost:3000');
  });
} catch (err) {
  console.error('An error occurred, unable to start the server')
  console.error(err)
}

});
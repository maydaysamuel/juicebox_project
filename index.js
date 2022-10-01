require('dotenv').config();

const { PORT = 3000 } = process.env;
const express = require('express');
const server = express();

const morgan = require('morgan')
server.use(morgan('dev'));

server.use(express.json());

server.use((req, res, next) => {
    console.log('<--- Body Logger START --->');
    console.log(req.body);
    console.log('<--- Body Logger END --->');

    
    next();
})

const apiRouter = require('./api')
server.use('/api', apiRouter)

const { client } = require('./db');
client.connect();

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
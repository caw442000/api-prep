const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan')

const server = express();
const showsRouter = require('./data/routers/showsRouter.js');
const charactersRouter = require('./data/routers/charactersRouter.js')
server.use(helmet());
server.use(morgan("dev"));
server.use(express.json());

server.use('/api/shows', showsRouter);
// server.use('/api/characters', charactersRouter);


server.get('/', (req, res) => {
  res.status(200).json({message: "It is alive"})
})



module.exports = server;
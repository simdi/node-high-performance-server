'use strict';

const restify = require('restify');
const { etagger, timestamp, fetchContent } = require('./util')();
const server = restify.createServer();
const port = 3000 || process.env.PORT;

server.use(etagger().bind(server));

server.get('/seed/v1', function (req, res, next) {
  fetchContent(req.url, (err, content) => {
    if (err) return next(err);
    res.send({data: content, url: req.url, ts: timestamp()});
    next();
  });
});

server.listen(port, console.log(`Server started on port ${port}`));


// const express = require('express');
// const app = express();
// const port = 3000;

// app.get('/', (req, res) => res.send('Hello World!'));

// app.listen(port, () => console.log(`Example app listening on port ${port}!`));

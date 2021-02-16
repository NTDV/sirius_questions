// const express = require("express");
// const app = express();
const http = require('http');

const server = http.createServer((req, resp) => {
    resp.writeHead(200, {
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin': "*",
    });

    if (req.method == 'GET') {
        console.log(1);
        resp.end("true");
    }
});

server.listen(3002, () => {
    console.log('Сервер запущен');
})
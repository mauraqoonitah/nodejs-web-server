const http = require('http');

const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'text/html');
    response.statusCode = 200;

    const { method } = request;

    if (method === 'GET') {
        response.end('<h1>Hello!</h1>');
    }
    if (method === 'POST') {
        let body = [];

        request.on('data', (chunk) => {
            body.push(chunk);
        });

        request.on('end', () => {
            body = Buffer.concat(body).toString();
            //mengubah JSON string menjadi JavaScript objek
            const { name } = JSON.parse(body);
            response.end(`<h1>Hai! ${name}!</h1>`);
        });
    }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});

//jalankan di terminal
// npm run start

//jalankan di cmd 
// curl -X GET http://localhost:5000
// curl -X POST http://localhost:5000
// curl -X PUT http://localhost:5000
// curl -X DELETE http://localhost:5000
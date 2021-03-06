const http = require('http');

const requestListener = (request, response) => {
    // response.setHeader('Content-Type', 'text/html');
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('X-Powered-By', 'NodeJS');
    // response.statusCode = 200;



    // const { method } = request;

    // if (method === 'GET') {
    //     response.end('<h1>Hello!</h1>');
    // }
    // if (method === 'POST') {
    //     let body = [];

    //     request.on('data', (chunk) => {
    //         body.push(chunk);
    //     });

    //     request.on('end', () => {
    //         body = Buffer.concat(body).toString();
    //         //mengubah JSON string menjadi JavaScript objek
    //         const { name } = JSON.parse(body);
    //         response.end(`<h1>Hai! ${name}!</h1>`);
    //     });
    // }

    //===========
    // Routing Request
    //===========

    //ambil properti url dari request menggunakan teknik destructuring object

    const { method, url } = request;

    if (url === '/') {
        if (method === 'GET') {
            response.statusCode = 200;

            response.end(JSON.stringify({
                message: 'Ini adalah homepage',
            }));
        } else {
            response.statusCode = 400;

            response.end(JSON.stringify({
                message: `Halaman tidak dapat diakses dengan ${method} request`,
            }));
        }

        // TODO 2: logika respons bila url bernilai '/'
    } else if (url === '/about') {
        // TODO 3: logika respons bila url bernilai '/about'
        if (method === 'GET') {
            response.statusCode = 200;

            response.end(JSON.stringify({
                message: 'Halo! Ini adalah halaman about',
            }));
        } else if (method === 'POST') {
            let body = [];

            request.on('data', (chunk) => {
                body.push(chunk);
            });

            request.on('end', () => {
                body = Buffer.concat(body).toString();
                const { name } = JSON.parse(body);
                response.statusCode = 200;

                response.end(JSON.stringify({
                    message: `Halo, ${name}! Ini adalah halaman about`,
                }));
            });
        } else {
            response.statusCode = 400;

            response.end(JSON.stringify({
                message: `Halaman tidak dapat diakses menggunakan ${method}, request`
            }));
        }

    } else {
        // TODO 1: logika respons bila url bukan '/' atau '/about'
        response.statusCode = 404;

        // response.end('<h1> Halaman tidak ditemukan!</h1>');
        // Karena response.end() menerima string (atau buffer), maka kita perlu mengubah objek JavaScript menjadi JSON string menggunakan JSON.stringify().
        response.end(JSON.stringify({
            message: 'Halaman tidak ditemukan!',
        }));
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
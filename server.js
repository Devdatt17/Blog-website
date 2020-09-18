const http = require('http');
const fs = require('fs');
const _ = require('lodash');


//creating server
//you can store it in variable if you are using sockets
//Response and Request res and req
const server = http.createServer((req, res) => {
    //console.log(req.url, req.method);
    //lodash
    const num = _.random(0, 20);
    console.log(num);
    const greet = _.once(() => {
        console.log("Welcome once");
    });

    greet();
    //set header content type for getting response
    res.setHeader('Content-Type', 'text/html');

    let path = './views/';
    //setting status code

    switch (req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;

            //redirecting a page
            //now if user goes to about-me it will be 
            //redirected to about
        case '/about-us':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;

        default:
            path += 'Error404.html';
            res.statusCode = 404;
            break;
    }

    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            //res.write(data); used for more no. of files

            res.end(data);
        }
    });
});



//Takes three parameters (portNumber, 'localhost', function)
//localhost is default value
server.listen('3000', 'localhost', () => {
    console.log('Listening for request on port number 3000');
});
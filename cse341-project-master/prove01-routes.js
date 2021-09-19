const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.setHeader('content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>enter message</title><head>');
        res.write('<body><h1>Welcome to the login page!</h1></body>')
        res.write('<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form></body>')
        res.write('</html>');
        return res.end();
    };

    if (url === '/users') {
        // shows a list of dummy users
        res.setHeader('content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>User list</title><head>');
        res.write('<body><h1>Welcome to the user page</h1></body>')
        res.write('<body><ul><li>Bobby Lee</li><li>Sally Burns</li><li>Frodo Baggins</li></ul></body>')
        res.write('</html>');
        return res.end();
    };

    if (url === '/create-user') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody.split('=')[1]);
        });
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
    };

    
};

module.exports = requestHandler;
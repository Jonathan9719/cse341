const fs = require('fs');

const requestHandler = (req, res) => {

    // gets the url and method
    const url = req.url;
    const method = req.method;
    
    // if the url only has a / after it this is executed
    if (url === '/') {
        // when something is submitted the / is turned into /message
        res.write('<html>');
        res.write('<head><title>enter message</title><head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>')
        res.write('</html>');
        // the return will make it so we don't conintue with the code below and exit out of the function
        return res.end();
    }
    
    // once the url changes to /message and method is POST this is executed
    if (url === '/message' && method === 'POST') {
        // create an array called body
        const body = [];
        // grabs chunk and pushes to body
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        // at the end takes body and puts in parsedBody which is split to get just
        // the message and the message is put in the file system
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            // use writefilesync so that server moves on if "message" is really big
            fs.writeFileSync('message.txt', message, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/')
                return res.end();
            });
        });
    
    }
    
    // sending the response in html!
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My first page</title><head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>')
    res.write('</html>');
    res.end();
}

module.exports = {
    handler: requestHandler,
    someText: 'Some hard coded text'
};
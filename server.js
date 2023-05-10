
// https://www.digitalocean.com/community/tutorials/how-to-create-a-web-server-in-node-js-with-the-http-module
const fs = require("fs")
const http = require("http");

const host = 'localhost';
const port = 8000;

const requestListener = function (req, res) {
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment;filename=oceanpals.csv");
    res.writeHead(200);
    res.end(`id,name,email\n1,Sammy Shark,shark@ocean.com`);
};

const server = http.createServer(requestListener);

fs.readFile(__dirname + "/index.html")
    .then(contents => {
        indexFile = contents;
        server.listen(port, host, () => {
            console.log(`Server is running on http://${host}:${port}`);
        });
    })
    .catch(err => {
        console.error(`Could not read index.html file: ${err}`);
        process.exit(1);
    });

// Import the f5-nodejs module.
var f5 = require('f5-nodejs');
var ocsp = require('./ocsp');
var fs = require('fs');
var shell = require('shelljs');

var key = fs.readFileSync('./certs/ocsp.f5lab.com.key.nopass.pem');
var cert = fs.readFileSync('./certs/ocsp.f5lab.com.cert.pem');
var chain = fs.readFileSync('./certs/ca-chain.cert.pem');

/*
var plugin = new f5.ILXPlugin();

// Register a callback for new connections received by a Virtual Server.
plugin.on("connect", function(flow) {

    // Register a callback to read payload data from the client and forward to the server.
    flow.client.on("readable", function() {
        while (true) {
            var buffer = flow.client.read();
            if (buffer !== null) {
                flow.server.write(buffer);
            }
            else {
                break;
            }
        }
    });

     // Create and register a callback to read payload data from the server and forward to
     // the client.
    flow.server.on("readable", function() {
        while (true) {
            var buffer = flow.server.read();
            if (buffer !== null) {
                flow.client.write(buffer);
            }
            else {
                break;
            }
        }
    });

    // Register callbacks for error events. Errors events must be caught.
    flow.client.on("error", function(errorText) {
        console.log("client error event: " + errorText);
    });
    flow.server.on("error", function(errorText) {
        console.log("server error event: " + errorText);
    });
    flow.on("error", function(errorText) {
        console.log("flow error event: " + errorText);
    });
});

// Start listening for new flows.
var options = new f5.ILXPluginOptions(); // options are optional
plugin.start(options);
*/

// OCSP Server 
var server = ocsp.Server.create({
  cert: cert,
  key: key,
  ca: chain
});

server.listen(8000);


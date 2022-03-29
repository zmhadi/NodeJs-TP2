const WebServer = require('./src/core/web-server');
require('dotenv').config();

const webServer = new WebServer();
webServer.start();

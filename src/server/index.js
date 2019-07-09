const port = 9999;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./db.config.js');

const api = require('./apis')(db, ['countdown']);
// var cors = require('cors');
const path = require('path');

// app.use(cors());
app.use(bodyParser.json());
app.use(`/api/v${api.version}`, api.routers);
//ci-dessus prefixer chaque route des API par api/v1/ + associer routers à l'app
app.set('trust proxy', true);

console.log('node server running @ http://localhost:' + port);
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
app.listen(port);

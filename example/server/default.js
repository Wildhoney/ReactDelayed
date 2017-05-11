import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5000;

app.use(express.static(`${__dirname}/example`));
server.listen(port);

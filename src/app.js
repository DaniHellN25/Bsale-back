const express = require("express");
const morgan = require("morgan");
const routes = require("./routes/index");

const cors = require("cors");
const server = express();

server.name = "API";
server.use(cors());
server.use(express.json());
server.use(morgan("dev"));
server.use((req, res, next) => {
  const allowedOrigins = ['http://127.0.0.1:5500', 'https://bsale-store-d.vercel.app'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  // res.header("Access-Control-Allow-Origin", "https://bsale-store-d.vercel.app"); /*Solo se aceptan peticiones de parte de nuestro cliente*/
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
  next();
});

server.use("/" , routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;

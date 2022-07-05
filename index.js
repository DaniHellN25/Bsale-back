const server = require("./src/app");

server.listen(process.env.PORT, () => {
  console.log(`%s running  at ${process.env.PORT}`);
});

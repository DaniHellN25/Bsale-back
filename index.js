const server = require("./src/app");

server.listen(process.env.PORT, () => {
  console.log(`server running  at ${process.env.PORT}`);
});

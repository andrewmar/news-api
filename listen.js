const app = require("./app.js");

const { PORT = 9090 } = process.env;

app.listen(PORT, () => {
  console.log(`Listen on port ${PORT}...`);
});

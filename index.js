// const server = require('./server');
const middleware = require("./middleware");
const app = require("express")();
const data = require('./data/index');

middleware(app);

app.listen(4000, () => {
  console.log("\n*** Server Running on http://localhost:4000 ***\n");
});

app.use(data);

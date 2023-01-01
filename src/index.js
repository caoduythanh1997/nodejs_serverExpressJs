const path = require("path");
const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const port = 3000;
const route = require("./routes");
const app = express();
app.use(morgan("combined"));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources\\views"));

route(app);

app.listen(port, () => console.log(`Đã mở port ${port}`));

const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const db = require('./config/db');
const port = 3000;
const route = require('./routes');
const app = express();
db.connect();
app.use(cors());
app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('method'));
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());

app.engine(
  'hbs',
  handlebars.engine({
    extname: '.hbs',
    helpers: {
      sum: (a, b) => a + b,
    },
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources\\views'));

route(app);

app.listen(port, () => console.log(`Đã mở port ${port}`));

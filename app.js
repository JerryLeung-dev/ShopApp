const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const expHandlebars = require('express-handlebars');
const db = require('./util/database');

const app = express();


const adminRoutes= require('./routes/admin');
const shopRoutes = require('./routes/shop');

const notFoundController = require('./controllers/error');

db.execute('SELECT * FROM products')
  .then(result => {
    console.log(result[0], result[1]);
  })
  .catch(err => {
    console.log(err);
  })


// engine('ntemplate ame',function)
app.engine('hbs', expHandlebars({
    extname: "hbs",
    defaultLayout: 'main-layout'
  })); //define template
app.set('view engine', 'ejs');
// app.set('view engine', 'pug');//register engine
app.set('views', 'views');



app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(notFoundController.get404);

app.listen(3000);

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const expHandlebars = require('express-handlebars');

const app = express();

// engine('ntemplate ame',function)
app.engine('hbs', expHandlebars({
    extname: "hbs",
    defaultLayout: 'main-layout'
  })); //define template
app.set('view engine', 'ejs');
// app.set('view engine', 'pug');//register engine
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: 'Page not Found!'});
});

app.listen(3000);

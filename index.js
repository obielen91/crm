const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const mongoose = require('mongoose');

const Customer = require('./models/CustomerModel');
const Event = require('./models/EventModel');

mongoose.connect('mongodb://127.0.0.1:27017/crm')

app.use('/files', express.static('public'));
app.use(express.urlencoded({extended: true}));

app.engine('hbs', hbs.engine({extname: '.hbs'}));
app.set('view engine', 'hbs');




const customerRouter = require('./routes/customerRouters');
app.use('/customer', customerRouter);










app.listen(8050, function() {
    console.log('Serwer Node.js działa');
})


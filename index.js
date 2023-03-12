const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const hbsHelpers = require('handlebars-helpers');
const mongoose = require('mongoose');

const cookieParser = require('cookie-parser');

const Customer = require('./models/CustomerModel');
const Event = require('./models/EventModel');

const customerRouter = require('./routes/customerRouters');
const authHelper = require('./middlewares/authHelper');
const userRouter = require('./routes/userRoutes');




mongoose.connect('mongodb://127.0.0.1:27017/crm')

app.use(cookieParser());

const hbsEngine = hbs.engine({extname: '.hbs'});
hbsHelpers(hbsEngine.handlebars, {});
app.engine('hbs', hbsEngine);
app.set('view engine', 'hbs');

app.use('/files', express.static('public'));
app.use(express.urlencoded({extended: true}));

// app.engine('hbs', hbs.engine({extname: '.hbs'}));
// app.set('view engine', 'hbs');

app.use('/customer', authHelper, customerRouter);
app.use('/user', userRouter);



app.listen(8050, function() {
    console.log('Serwer Node.js działa');
})

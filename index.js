const express = require('express');
const app = express();
const fileupload = require('express-fileupload');
const path = require('path');
const db_conn = require('./config/db');
const cors = require('cors');
const cart = require('./routes/cart');
const product = require('./routes/products');
const token = require('./routes/token');
const registration = require('./routes/registration');
const auth = require('./routes/auth');
const order = require('./routes/order');



//initialisations

app.use(cors());
app.use(express.json());
app.use(fileupload());



//routes
app.use('/api/cart',cart);
app.use('/api/product',product);
app.use('/api/token',token);
app.use('/api/registration',registration);
app.use('/api/auth',auth);
app.use('/api/order',order);
//app.use(express.static('public'));
app.use('/products', express.static('products'));

const PORT = 4000;

app.listen(PORT, ()=>{
    console.log('listening to port ' + PORT);
})

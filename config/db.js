const mongoose = require('mongoose');
const testDb = 'mongodb://127.0.0.1/molenu';
const dbUrl = 'mongodb+srv://mystry:mystry22@fancyfinery.k3uod.mongodb.net/fancystore?retryWrites=true&w=majority';
mongoose.connect(dbUrl, {useUnifiedTopology:true, useNewUrlParser:true},()=>{
    console.log('db connection ok for fancyfinery');
});
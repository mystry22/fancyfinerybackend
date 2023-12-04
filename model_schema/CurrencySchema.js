const mongoose = require('mongoose');

const CurrencySchema = new mongoose.Schema({
    
    ip: {
        type: String,
        min: 2,
        max: 1005
    },
    base_currency: {
        type: String,
        min: 2,
        max: 1005
    },
    delivery_fee: {
        type: Number,
        
    },

    
    
 
});

module.exports = mongoose.model('Currency',CurrencySchema);
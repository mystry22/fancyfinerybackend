const mongoose = require('mongoose');

const Delivery = new mongoose.Schema({
    delivery_name: {
        type: String,
        min: 2,
        max: 1005
        
    },
    delivery_country: {
        type: String,
        min: 2,
        max: 1005
    },
    street: {
        type: String,
        
    },
    city: {
        type: String,
        min: 2,
        max: 1005
    },
    phone: {
        type: String,
        min: 2,
        max: 1005
    },
    delivery_state: {
        type: String,
        min: 2,
        max: 1005
    },
    user_ip: {
        type: String,
        min: 2,
        max: 1005
    },
    ref:{
        type: String,
        min: 2,
        max: 1005
    },
    lga : {
        type: String,
        min: 2,
        max: 1005
    },
    delivery_fee : {
        type: Number,
    }
    
    
    
 
});

module.exports = mongoose.model('Delivery',Delivery);
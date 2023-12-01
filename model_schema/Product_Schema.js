const mongoose = require('mongoose');

const Product = new mongoose.Schema({
    upload_date: {
        type: Date,
        
    },
    prod_name: {
        type: String,
        min: 2,
        max: 1005
    },
    video: {
        type: String,
        min: 2,
        max: 1005
    },
    prod_id: {
        type: String,
        min: 2,
        max: 1005
    },
    price: {
        type: String,
        min: 2,
        max: 1005
    },
    price_usd: {
        type: String,
        min: 2,
        max: 1005
    },
    old_price: {
        type: String,
        min: 2,
        max: 1005
    },
    old_price_usd: {
        type: String,
        min: 2,
        max: 1005
    },
    cat_name: {
        type: String,
        min: 2,
        max: 1005
    },
    image_link: {
        type: String,
        
    },
    image_variation1: {
        type: String,
        
    },
    image_variation2: {
        type: String,
        
    },
    image_link: {
        type: String,
        
    },
    description: {
        type: String,
        min: 2,
        max: 1005
    },
    display_home: {
        type: String,
        min: 2,
        max: 1005
    },
    stock: {
        type: String,
        min: 2,
        max: 1005
    },
    weight: {
        type: String,
        min: 2,
        max: 1005
    },
    

    
    
 
});

module.exports = mongoose.model('Products',Product);
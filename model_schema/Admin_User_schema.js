const mongoose = require('mongoose');

const AdminUserSchema = new mongoose.Schema({
    email: {
        type: String,
        min: 2,
        max: 1005
    },
    reg_date: {
        type: Date
    },
    uniquekey: {
        type: String,
        min: 2,
        max: 1005
    },

    
    
 
});

module.exports = mongoose.model('Admin',AdminUserSchema);
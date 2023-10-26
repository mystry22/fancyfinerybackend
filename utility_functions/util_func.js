const nodemailer = require('nodemailer');

const getCustomDate = ()=>{
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    const day = today.getDate();

    const factor = "0"
    if(month <= 9){
        month = factor + month ;
    }

    const todate = day + '-' + month + '-' + year;
    return today;
    
}



module.exports.getCustomDate = getCustomDate;

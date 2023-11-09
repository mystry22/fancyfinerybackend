const nodemailer = require('nodemailer');
const { setUserOTP, updateToken } = require('../model/TokenModel');
require('dotenv').config();

// Email Transporter
const transport = () => {
    const transport = nodemailer.createTransport({
        host: process.env.HOST,
        name: process.env.SERVER_NAME,
        port: 465,
        secureConnection: false,
        auth: {
            //user: 'talk@fancyfineryhub.com.ng',
            user: process.env.USER,
            //pass: 'admmai.332'
            pass: process.env.USER_PASSWORD
        },
        tls:{
            rejectUnauthorized:false
        }
    });

    return transport;
}

const transportOrder = () => {
    const transport = nodemailer.createTransport({
        host: process.env.HOST,
        name: process.env.SERVER_NAME,
        port: 465,
        secureConnection: false,
        auth: {
            //user: 'talk@fancyfineryhub.com.ng',
            user: process.env.ORDER_USER,
            //pass: 'admmai.332'
            pass: process.env.ORDER_USER_PASSWORD
        },
        tls:{
            rejectUnauthorized:false
        }
    });

    return transport;
}
// generate OTP
const genOTP = () => {
    const min = 1000;
    const max = 9999;
    const delta = max - min;
    const gen = Math.random();
    const initVal = delta * gen;
    const floored = Math.floor(initVal);
    const conToString = floored.toString();
    const OTP = conToString;
    return OTP;
}

// get today's date
const toDate = () => {
    const today = new Date();
    return today;
}



//Generate And Send Mail Function
const mailOTP = async (to) => {
    const reg_date = toDate();
    const OTP = genOTP();
    setUserOTP(to, OTP, reg_date);
    let msg = '';
    const transporter = transport();
    const custom = `
                <h2>Molenu</h2><br /> <br />

                 Hi Dear, <br />
                    Kindly use the code ${OTP} to complete your registration <br /> <br />
                    
                Best Regards
                 `;
    const mailOptions = {
        from: '<talkto@fink.com.ng>',
        to: to,
        subject: "Molenu Email Verification",
        html: custom
    }

    const mailRes = await transporter.sendMail(mailOptions);
    msg = mailRes.response
    return msg.substring(4, 6);


}

//Generate And Update And Send Mail Function
const updateMailOTP = async (to) => {
    const reg_date = toDate();
    const OTP = genOTP();
    updateToken(to, OTP, reg_date);
    let msg = '';
    const transporter = transport();
    const custom = `
                <h2>Molenu</h2><br /> <br />
                Hi Dear, <br />
                    Kindly use the code ${OTP} to complete your registration <br /> <br />
                    
                Best Regards
                 `;
    const mailOptions = {
        from: '<talkto@fink.com.ng>',
        to: to,
        subject: "Molenu Email Verification",
        html: custom
    }

    const mailRes = await transporter.sendMail(mailOptions);
    msg = mailRes.response
    return msg.substring(4, 6);


}

const orderNotification = async (full_name,
    email,
    address,
    city,
    country,
    phone,
    paid,
    delivery_fee,
    base_currency,
    lga,
    heights,
    prod_name,
    ref,
    qty,
    prod_id,
    todate,
    image_link) => {
    let msg = '';
    const transporter = transportOrder();
    const custom = `
                <h2>Fancy Finery New Order Notification</h2><br /> <br />

                 Hi Dear Team, <br /><br />

                    A new order has been requested see order details below: <br /><br /> 

                    <p style="color:black; font-weight:bold;">

                    Full Name: ${full_name} <br />
                    Email: ${email} <br />
                    Address: ${address} <br />
                    City: ${city} <br />
                    LGA: ${lga} <br />
                    Country: ${country} <br />
                    Phone: ${phone} <br />
                    Total Amount: ${paid} <br />
                    Delivery Fee: ${delivery_fee} <br />
                    Base Currency: ${base_currency} <br />
                    Height: ${heights} <br />
                    Product Name: ${prod_name} <br />
                    Reference: ${ref} <br />
                    Quantity: ${qty} <br />
                    Product ID: ${prod_id} <br />
                    Order Date: ${todate} <br />
                    Product Image Link: ${image_link} <br />
                    </p>
                    
                    
                    <br /> Kindly reach out to customer <br /> <br />
                    
                Best Regards <br /><br />
                 `;
    const mailOptions = {
        from: 'orders@fancyfineryhub.com.ng',
        to: 'support@fancyfineryhub.com.ng',
        subject: "New Order Notification",
        html: custom
    }

    const mailRes = await transporter.sendMail(mailOptions);
    msg = mailRes.response
    return msg.substring(4, 6);
}

const contactMail = async (by, fro, msgBody, msgSubject) => {
    let msg = '';
    const transporter = transport();
    const custom = `
                <h2>Fancy Finery Contact</h2><br /> <br />

                 Hi Dear Team, <br /><br />

                    This is to notify you of the concerns by ${by} with email address ${fro} and body message below: <br /><br /> <p style="color:black; font-weight:bold">${msgBody} </p> <br /> <br /> 
                    Kindly reach out to this customer and further assist with the stated concern<br /> <br />
                    
                Best Regards <br /><br />
                 `;
    const mailOptions = {
        from: 'talk@fancyfineryhub.com.ng',
        to: 'support@fancyfineryhub.com.ng',
        subject: msgSubject,
        html: custom
    }

    const mailRes = await transporter.sendMail(mailOptions);
    msg = mailRes.response
    return msg.substring(4, 6);
}

const custNotification = async (name, ref, to) => {
    let msg = '';
    const transporter = transport();
    const custom = `
                <h2>Molenu New Order Notification</h2><br /> <br />

                 Dear ${name}, <br /><br />

                  This is to acknowledge your order with order reference #${ref} and will be ready within 7 working days<br /> <br />
                  Kindly reachout to us on contact@molenu.com.ng for updates on order or product customisation preferences as we can't wait to hear from<br /><br />
                  Henry (Team Lead)<br /><br />
                Best Regards
                 `;
    const mailOptions = {
        from: '#Order Notification <talkto@fink.com.ng>',
        to: to,
        subject: "Molenu Order Notification",
        html: custom
    }

    const mailRes = await transporter.sendMail(mailOptions);
    msg = mailRes.response
    return msg.substring(4, 6);
}


const mailContact = (from, subject, message, name) => {
    let msg = '';
    const transporter = transport();
    const custom = `
                <h2>Fink Traders</h2><br /> <br />
                    My name is ${name} and email address ${from} <br />
                    ${message} <br /><br />
                Best Regards
                 `;
    const mailOptions = {
        from: '<talkto@fink.com.ng>',
        to: 'alanemehenry6@gmail.com,help@fink.com.ng',
        subject: subject,
        html: custom
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
            msg = 'Unable to Complete Request';
            return msg;
        } else {
            msg = 'Your Message Has Been Sent';

        }
    })
}

const actiAlert = (subject, name, plan, to) => {
    let msg = '';
    const transporter = transport();
    const custom = `
                <h2>Fink Traders</h2><br /> <br />
                   Dear ${name} your request for a ${plan} has been activated succefully <br />
                    We look forward to hearing from you on how we can serve you more or tailor our product <br />
                    to suit your needs, kindly mail us on help@fink.com.ng <br /><br />
                Best Regards
                 `;
    const mailOptions = {
        from: 'Henry From Fink <talkto@fink.com.ng>',
        to: to,
        subject: subject,
        html: custom
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
            msg = 'Unable to Complete Request';
            return msg;
        } else {
            msg = 'Your Message Has Been Sent';

        }
    })
}

const welcome = async (to) => {
    let msg = '';
    const transporter = transport();
    const custom = `
                <h2>Molenu New Order</h2><br /> <br />

                 Hi Dear , <br /><br />

                    Thank you for your interest in shopping with Molenu and we are so excited to have you here with us<br /> <br />
                    We pride ourself as Nigeria's No1 Online Fashion and Lifestle shopping plug and we can't wait to serve you, 
                    Kindly let us know how we can serve you better as you can always reach us on contact@molenu.com.ng<br /><br />

                    Henry (Team Lead); <br />
                Best Regards
                 `;
    const mailOptions = {
        from: 'Henry From Molenu <talkto@fink.com.ng>',
        to: to,
        subject: "Welcome To Molenu",
        html: custom
    }

    const mailRes = await transporter.sendMail(mailOptions);
    msg = mailRes.response
    return msg.substring(4, 6);
}

module.exports.mailOTP = mailOTP;
module.exports.updateMailOTP = updateMailOTP;
module.exports.toDate = toDate;
module.exports.mailContact = mailContact;
module.exports.actiAlert = actiAlert;
module.exports.orderNotification = orderNotification;
module.exports.custNotification = custNotification;
module.exports.welcome = welcome;
module.exports.contactMail = contactMail;
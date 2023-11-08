const UserSchema = require('../model_schema/User_Schema');
const CurrencySchema = require('../model_schema/CurrencySchema');

const signup =async(data)=>{
    const newUser = new UserSchema(data);
    const res = await newUser.save();
}

const checkEmail = async(data)=>{
    const user = await UserSchema.findOne(data);
    return user;
}

const getDetails = async function(data){
    const userdata = await UserSchema.findOne(data);
    return userdata;
}

const getAllUsers = async function(){
    const userdata = await UserSchema.find();
    return userdata;
}

const saveCurrencyOption =async(data)=>{
    const newUser = new CurrencySchema(data);
    const res = await newUser.save();
}

const getCurrency = async function(data){
    const userdata = await CurrencySchema.findOne(data);
    return userdata;
}

const updateCurrency = async function(ip,base_currency){
    
    const update = await CurrencySchema.updateOne({ip : ip}, {$set : {base_currency: base_currency}});
    if(update){
        return 'ok';
    }
}


module.exports.signup = signup;
module.exports.checkEmail = checkEmail;
module.exports.getDetails = getDetails;
module.exports.getAllUsers = getAllUsers;
module.exports.saveCurrencyOption = saveCurrencyOption;
module.exports.getCurrency = getCurrency;
module.exports.updateCurrency = updateCurrency;


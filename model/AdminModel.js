const AdminUserSchema = require('../model_schema/Admin_User_schema');

const signupAdmin =async(data)=>{
    const newUser = new AdminUserSchema(data);
    const res = await newUser.save();
}

const checkAdminEmail = async(data)=>{
    const user = await AdminUserSchema.findOne(data);
    return user;
}

const getAdminDetails = async function(data){
    const userdata = await AdminUserSchema.findOne(data);
    return userdata;
}

const getAllAdmins = async function(){
    const userdata = await AdminUserSchema.find();
    return userdata;
}





module.exports.signupAdmin = signupAdmin;
module.exports.checkAdminEmail = checkAdminEmail;
module.exports.getAdminDetails = getAdminDetails;
module.exports.getAllAdmins = getAllAdmins;

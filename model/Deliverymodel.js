const Delivery = require('../model_schema/Delivery_Schema');


const save_delivery =async(data)=>{
    const newDelivery = new Delivery(data);
    const res = await newDelivery.save();
}

const findDelivery = async function(data){
    const prodExist = await Delivery.findOne(data);
    return prodExist;
}

const deleteEntry = async function(data){
    const deleteOne = await Delivery.deleteOne(data);
    if(deleteOne){
        return 'okay'
    }else{}
    return 'not okay'
}


module.exports.save_delivery = save_delivery;
module.exports.findDelivery = findDelivery;
module.exports.deleteEntry = deleteEntry;



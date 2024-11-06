const mongoose = require('mongoose');
const purchase = require('./purchase');


const productPurchasedSchema=new mongoose.Schema({
    purchaseID:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"purchase"
    }    
,
    variantID:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"productVariant"
    },
    quantity:
    {
        type:Number
    }
})


module.exports = mongoose.model('D', productPurchasedSchema);

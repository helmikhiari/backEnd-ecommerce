const mongoose = require('mongoose');

const purchaseSchema=new mongoose.Schema({
    userID:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    products:[
        {type:mongoose.Schema.Types.ObjectId,
        ref:"productPurchase"}
    ],
    total_price:
    {
        type:Number
    },
    promoCode:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"promoCode"
    }
})


module.exports = mongoose.model('purchase', purchaseSchema);

const mongoose = require('mongoose');

const userCartSchema=new mongoose.Schema({
    variant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productVariant",
        required: false
    },
    quantity:
    {
        type:Number
    },  
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: false
    },
},
{ timestamps: true, versionKey: false })

module.exports = mongoose.model('userCart', userCartSchema);

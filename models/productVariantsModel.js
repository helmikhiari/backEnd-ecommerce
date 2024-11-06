const mongoose = require('mongoose');

const productDetailsSchema = new mongoose.Schema({
    quantity:
    {
        type:Number,
    },
    size:
    {
        type:String,
    },
    color:
    {
        type:String
    },

    productID:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    }


},
    { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('productVariant', productDetailsSchema);
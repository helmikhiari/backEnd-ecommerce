const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true,
        unique: true,
    },
    price:
    {
        type: Number,
    },
    details: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'productVariant'
    }
    ],
    onSale:
    {
        type: Number,
        default:0
    },
    image:
    {
        type: String
    }
},
    { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('product', productSchema);
const mongoose = require('mongoose');
const promoCodeSchema = new mongoose.Schema({
    code:
    {
        type:String,
        unique:true,
    },
    used:
    {
        type:Boolean,
        default:false,
    },
    percent:
    {
        type:Number,
        required:true
    },
    usedBy:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
},
    { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('promoCode', promoCodeSchema);
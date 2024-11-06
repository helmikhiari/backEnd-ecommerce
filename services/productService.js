const productModel = require("../models/productModel");
const variantModel = require("../models/productVariantsModel")
exports.getProducts = async () => {
    try {
        const products = await productModel.find();
        return products;
    }
    catch (error) {
        console.log(error);
    }
}


exports.searchProducts = async (name) => {
    try {

        const products = await productModel.find();
        let filtered = products.filter(p => p.name.toLowerCase().includes(name.toLowerCase()))
        return filtered;
    }
    catch (error) {
        console.log(error);
    }
}

exports.addProduct = async (name, price, img, onSale) => {
    try {
        const newProduct = new productModel({ name, price, image: `https://backend-ecommerce-1-eoda.onrender.com/uploads/${img.filename}`, onSale });
        await newProduct.save();
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

exports.checkVariant = async (variantID) => {
    try {
        const variant = await variantModel.findById(variantID)
        return !!variant;
    }
    catch (error) {
        console.log(error);
    }
}

exports.checkStock = async (quantity, variantID) => {
    try {
        const variant = await variantModel.findById(variantID)
        return variant.quantity >= quantity;
    }
    catch (error) {
        console.log(error);
    }
}

exports.checkProduct = async (productID) => {
    try {
        const product = await productModel.findById(productID);
        return !!product;
    } catch (error) {
        console.log(error);
    }
}


exports.addVariant = async (productID, color, size, quantity) => {
    try {
        const product = await productModel.findById(productID);
        const existVariant = await variantModel.findOne({ productID, size, color })
        if (existVariant) {
            existVariant.quantity += quantity;
            await existVariant.save()
            return true;
        }
        const newVariant = new variantModel({ productID, color, size, quantity });
        await newVariant.save();
        product.details.push(newVariant);
        await product.save();
        return true;
    }
    catch (error) {
        return false;
        console.log(error);
    }
}


exports.getVariantsOfProduct = async (productID) => {
    try {
        const variants = await productModel.findById(productID).populate({ path: "details", select: 'color quantity size' });
        return variants.details;
    } catch (error) {
        return false;
    }
}
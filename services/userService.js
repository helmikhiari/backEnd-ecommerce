const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const variantModel = require('../models/productVariantsModel')
const userCartModel = require('../models/userCart');
const productModel = require('../models/productModel');
const promoCodesModel = require('../models/promoCodes');
const userCart = require('../models/userCart');
const purchaseModel = require("../models/purchase");
const productPurchasedModel = require("../models/productPurchased")
exports.checkUserExists = async (email) => {
    try {
        const user = await userModel.findOne({ email: email })

        return (!!user);
    }
    catch (error) {
        console.log(error);
    }
}

exports.register = async (firstName, lastName, email, password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new userModel({ firstName, lastName, email, password: hashedPassword })
        await newUser.save();
        return true;

    }
    catch (error) {
        console.log(error);
    }
}

exports.getUserbyID = async (id) => {
    try {
        const selections = 'firstName lastName email cart favorites'
        const user = await userModel.findById(id).select(selections).populate({ path: "cart", populate: { path: "variant", select: "color size productID quantity", populate: { path: "productID", select: "name price image" } }, select: "quantity variant" });
        return user;
    }
    catch (error) {
        console.log(error);
    }
}

exports.updateUser = async (email, key, value) => {
    try {
        const user = await userModel.findOne({ email });
        user[key] = value;
        await user.save();
        return true;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}


exports.getUserbyProp = async (prop, value) => {
    try {
        const selections = 'firstName lastName email cart favorites'
        const user = await userModel.findById(id).select(selections);
        return user;
    }
    catch (error) {
        console.log(error);
    }
}


exports.addToCart = async (variantID, quantity, userID) => {
    try {
        const user = await userModel.findById(userID);
        console.log(user);
        const variant = await variantModel.findById(variantID);
        const existingSubCart = await userCartModel.findOne({ userID, variant });
        console.log(existingSubCart)
        if (existingSubCart) {
            existingSubCart.quantity += quantity;
            await existingSubCart.save();
            return true;
        }
        const newSubCart = new userCartModel({ userID: user, variant, quantity });
        await newSubCart.save();
        user.cart.push(newSubCart);
        await user.save();
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

exports.deleteFromCart = async (variantID, quantity, userID) => {
    try {
        const user = await userModel.findById(userID);

        const variant = await variantModel.findById(variantID);
        const existingSubCart = await userCartModel.findOne({ userID, variant });
        if (existingSubCart) {
            existingSubCart.quantity += quantity;
            await existingSubCart.save();
            return true;
        }
        const newSubCart = new userCartModel({ userID: user, variant, quantity });
        await newSubCart.save();
        user.cart.push(newSubCart);
        await user.save();
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

exports.toggleWishList = async (userID, productID) => {
    try {
        const user = await userModel.findById(userID);
        const foundProduct = user.favorites.findIndex((product) => product._id == productID)
        let msg = "";
        if (foundProduct != -1) {
            user.favorites.splice(foundProduct, 1);
            msg = "Removed from"
        }
        else {
            const product = await productModel.findById(productID);
            user.favorites.push(product);
            msg = "Added to"
        }
        await user.save();
        return msg

    } catch (error) {
        console.log(error);
        return null;
    }
}


exports.purchase = async (userID, promoCode) => {
    try {
        let promo;
        if (promoCode) {
            promo = await promoCodesModel.findOne({ code: promoCode });
        }
        let total_price = 0;
        const commande = new purchaseModel({ products: [] })
        const user = await userModel.findById(userID);
        for (const userCartID of user.cart) {
            const newProductPurchased = {};
            const data = await userCart.findById(userCartID).populate({
                path: "variant",
                select: "productID",
                populate: {
                    path: "productID",
                    select: "price onSale"
                }
            })
            let onsale = data.variant.productID.onSale;
            // console.log(data);
            let price = data.variant.productID.price * (1 - onsale);
            total_price += price * data.quantity;
            newProductPurchased.quantity = data.quantity;
            newProductPurchased.variantID = data.variant;
            newProductPurchased.purchaseID = commande;
            const variant = await variantModel.findById(data.variant._id);
            variant.quantity -= data.quantity;
            if (variant.quantity == 0)
                await variantModel.deleteOne({ _id: variant._id });
            const saveLittlePurchase = new productPurchasedModel(newProductPurchased);
            await saveLittlePurchase.save();
            commande.products.push(saveLittlePurchase);
        }
        if (promo) {
            total_price *= promo.percent;
            promo.usedBy = user;
            promo.used = true;
            await promo.save();
            commande.promoCode = promo;
        }

        commande.total_price = total_price;
        commande.userID = user
        await commande.save();
        while (user.cart.length > 0)
            user.cart.pop();

        user.purchases.push(commande)
        await user.save();


        while (await userCartModel.findOneAndDelete({ userID: user._id }))
            continue;



        return true;

    } catch (error) {
        console.log(error)
    }
}
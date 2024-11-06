
const userService = require("../services/userService");
const productService = require("../services/productService")
exports.register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (await userService.checkUserExists(email)) {
            return res.status(409).json({ message: "User with this email already exists" })
        }

        const registered = await userService.register(firstName, lastName, email, password);
        if (!registered) {
            return res.status(400).json({ message: "Registration error" });
        }

        return res.status(201).json({ message: "User Registered Successfully" });
    }
    catch (error) {
        console.log(error);
    }
}


exports.getUser = async (req, res) => {
    try {
        const user = await userService.getUserbyID(req.userID);
        return res.status(200).send(user);
    }
    catch (error) {
        console.log('controller error : ' + error);
    }
}


exports.addToCart = async (req, res) => {
    try {
        const { variantID, quantity } = req.body;
        
        if (! await productService.checkVariant(variantID)) {
            return res.status(400).json({ message: "Invalid Variant ID" });
        }
        if (! await productService.checkStock(quantity, variantID)) {
            return res.status(400).json({ message: "Quantity out of stock" })
        }
        const added = await userService.addToCart(variantID, quantity, req.userID)
        if (!added)
            return res.status(400).json({ message: "Error While adding to cart" })
        return res.status(204).json({ message: "Added to cart successfully" });
    }
    catch (error) {
        console.log(error);
    }
}



exports.toggleWishList = async (req, res) => {
    try {
        const { productID } = req.body
        if (! await productService.checkProduct(productID)) {
            return res.status(404).json({ message: "product not found" });
        }
        const toggled = await userService.toggleWishList(req.userID, productID);
        if (!toggled) {
            return res.status(400).json({ message: "Toggle Failed" });
        }
        return res.status(204).json({ message: `Product ${toggled}  wishlist Successffully` });
    } catch (error) {

    }
}

exports.purchase = async (req, res) => {
    try {
        const { promoCode } = req.body;
        if (promoCode) {
            const exist = await userService.checkPromoCode(promoCode);
            if (exist == 1) {
                return res.status(404).json({ message: "Invalid PromoCode" })
            }
            if (exist == 2) {
                return res.status(409).json({ message: "PromoCode already used" });
            }
        }
        const purchased = await userService.purchase(req.userID, promoCode);
        if (!purchased) {
            return res.status(400).json({ message: "Purchase failed" });
        }
        return res.status(201).json({ message: "Purchased Successfully" });
    }
    catch (error) {

    }
}
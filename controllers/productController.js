const productService = require('../services/productService')
    ;
exports.getProducts = async (req, res) => {
    try {
        const products = await productService.getProducts();
        return res.status(200).send(products);
    }
    catch (error) {
        console.log("controller error : " + error);
    }
}

exports.searchProducts = async (req, res) => {
    try {
        const {name}=req.params;
        
        const products = await productService.searchProducts(name);
        return res.status(200).send(products);
    }
    catch (error) {
        console.log("controller error : " + error);
    }
}

exports.addProduct = async (req, res) => {
    try {
        const { name, price, onSale } = req.body;
        const img = req.file;

        const added = await productService.addProduct(name, price, img,onSale);
        if (!added)
            return res.status(409).json({ message: "product add failed " });
        return res.status(201).json({ message: "product added" })
    }
    catch (error) {
        console.log("controller error : " + error);
    }
}

exports.addVariant = async (req, res) => {
    try {
        const { color, size, quantity, productID } = req.body;
        if (!productService.checkProduct(productID)) {
            return res.status(404).json({ message: "Product Not Found" });
        }
        const added = productService.addVariant(productID, color, size, quantity);
        if (!added) {
            return res.status(400).json({ message: "Add failed" });
        }
        return res.status(201).json({ message: "Variant Added Successfully" });
    }
    catch (error) {

    }
}

exports.getProduct = async (req, res) => {
    const { id } = req.params;
    try {
        if (!productService.checkProduct(id)) {
            return res.status(404).json({ message: "Product Not Found" });
        }
        const products = await productService.getVariantsOfProduct(id)
        return res.status(200).send(products);
    }
    catch (error) {
        console.log("error" + error);
    }
}
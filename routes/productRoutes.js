const express = require('express')
const router = express.Router()
const uploadConfig = require("../uploadConfig")
const productDto = require("../dtos/productDto")
const dtoMiddleware = require('../middlewares/dtoMiddleware');
const productController = require('../controllers/productController');

router.get('/getproducts', productController.getProducts);
router.get('/searchproducts/:name', productController.searchProducts);
router.get('/getproduct/:id', productController.getProduct);
router.post('/addProduct', uploadConfig.upload.single('image'), productController.addProduct)
router.post('/addVariant', productController.addVariant);
module.exports = router;
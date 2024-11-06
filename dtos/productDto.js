const { body, check } = require('express-validator');

exports.addProductDto = [
    body('name')
        .trim()
        .isString()
        .isLength({ min: 5, max: 50 })
    ,

    body('price')
        .isFloat({ min: 1 })
    ,
    check().custom((value, { req }) => {
        const allowedProps = ["name", "price"];
        const unallowedProps = Object.keys(req.body).filter(prop => !allowedProps.includes(prop))
        if (unallowedProps.length > 0) {
            throw new Error(`Unexpected Fields : ${unallowedProps.join(',')}`);

        }
        return true;
    })


]
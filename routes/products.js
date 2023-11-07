const express = require('express');
const router = express.Router();
const { getCustomDate } = require('../utility_functions/util_func');
const { createNewProduct, uploadProductImage, deleteProduct, editProduct, homeProducts, allProducts,
    createCategory, allCategories, prodInfo, shopProducts, searchName } = require('../model/ProductHelper');
require('dotenv').config();
const PublitioAPI = require('publitio_js_sdk').default;



router.post('/addproduct', (req, res) => {

    const data = {
        upload_date: getCustomDate(),
        prod_name: req.body.prod_name,
        prod_id: req.body.prod_id,
        price: req.body.price,
        old_price: req.body.old_price,
        cat_name: req.body.cat_name,
        description: req.body.description,
        display_home: req.body.display_home,
        image_link: req.body.image_link,
        price_usd: req.body.price_usd,
        old_price_usd: req.body.old_price_usd,
        video: req.body.video
    };

    createNewProduct(data).then(feed => {
        if (feed == 'ok') {
            res.json('New Product Added');
        } else {
            res.json('Unable To Add Product');
        }
    })
});


router.post('/addprodimage', async (req, res) => {

    const publitio = new PublitioAPI(process.env.API_Key, process.env.API_Secret);
    const file = req.files.image.data;
    const prod_id = req.body.prod_id;

    const isUploaded = await publitio.uploadFile(file, 'file');

    if (isUploaded.code == 201) {
        const imageName = isUploaded.url_download;
        const success = await uploadProductImage(prod_id, imageName);
        if (success) {
            res.json('Product Image Upload Successful')
        } else {
            res.json('Error with image upload')
        }

    } else {
        res.json('Error with image upload')

    }

});

router.post('/deleteproduct', (req, res) => {
    const data = {
        prod_id: req.body.prod_id
    }
    deleteProduct(data).then(feed => {
        if (feed == 'ok') {
            res.json('Product Deleted Successfuly');
        } else {
            res.json('Product Not Deleted');
        }
    })
});

router.post('/editproduct', (req, res) => {
    const prod_id = req.body.prod_id;
    const prod_name = req.body.prod_name;
    const price = req.body.price;
    const old_price = req.body.old_price;
    const cat_name = req.body.cat_name;
    const description = req.body.prod_desc;
    const display_home = req.body.display_home;

    editProduct(prod_id, prod_name, price, old_price, cat_name, description, display_home)
        .then(feed => {
            if (feed == 'ok') {
                res.json('Product Edited Successfuly');
            } else {
                res.json('Product Not Edited Successfuly');
            }
        })
});

router.post('/homeproducts', async (req, res) => {
    const products = await homeProducts();
    res.json(products);
});

router.post('/shopproducts', async (req, res) => {
    const products = await shopProducts();
    res.json(products);
});

router.post('/allproducts', async (req, res) => {
    const products = await allProducts();
    res.json(products);
});

router.post('/productinfo', async (req, res) => {

    const data = {
        prod_id: req.body.prod_id
    }

    const prods = await prodInfo(data);
    res.json(prods);
});

router.post('/availablecategory', async (req, res) => {
    const category = await allCategories();
    res.json(category);
});

router.post('/addcategory', (req, res) => {
    const data = {
        cat_name: req.body.cat_name,
        cat_id: req.body.cat_id
    }
    createCategory(data).then(feed => {
        if (feed == 'ok') {
            res.json('New Category Added');
        } else {
            res.json('No New Category Added');
        }
    })
});

router.post('/search', async (req, res) => {
    const prod_name = req.body.prod_name;
    const searchRes = await searchName(prod_name);
    if (searchRes.length > 0) {
        res.json(searchRes);
    } else {
        res.json('No product found');
    }
});




module.exports = router;
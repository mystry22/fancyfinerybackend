const express = require('express');
const router = express.Router();
const { getCustomDate } = require('../utility_functions/util_func');
const { createNewProduct, uploadProductImage, deleteProduct, editProduct, homeProducts, allProducts,
    createCategory, allCategories, prodInfo, shopProducts, searchName, deleteCategory,
    uploadProductImagevariation1, uploadProductImagevariation2,
} = require('../model/ProductHelper');
const { saveCurrencyOption, getCurrency, updateCurrency,setDelivery } = require('../model/UserModel');
require('dotenv').config();
const PublitioAPI = require('publitio_js_sdk').default;
const { contactMail } = require('../functions/Helper_functions');



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
        video: req.body.video,
        stock: req.body.stock,
        weight: req.body.weight,
        image_variation1: req.body.image_variation1,
        image_variation2: req.body.image_variation2,
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
        const imageName = isUploaded.url_short;
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

router.post('/addprodimagevariation1', async (req, res) => {

    const publitio = new PublitioAPI(process.env.API_Key, process.env.API_Secret);
    const file = req.files.image.data;
    const prod_id = req.body.prod_id;

    const isUploaded = await publitio.uploadFile(file, 'file');

    if (isUploaded.code == 201) {
        const imageName = isUploaded.url_short;
        const success = await uploadProductImagevariation1(prod_id, imageName);
        if (success) {
            res.json('Product Image Upload Successful')
        } else {
            res.json('Error with image upload')
        }

    } else {
        res.json('Error with image upload')

    }

});
router.post('/addprodimagevariation2', async (req, res) => {


    const publitio = new PublitioAPI(process.env.API_Key, process.env.API_Secret);
    const file = req.files.image.data;
    const prod_id = req.body.prod_id;

    const isUploaded = await publitio.uploadFile(file, 'file');

    if (isUploaded.code == 201) {
        const imageName = isUploaded.url_short;
        const success = await uploadProductImagevariation2(prod_id, imageName);
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
    const weight = req.body.weight;
    const stock = req.body.stock;
    const price_usd = req.body.price_usd;
    const old_price_usd = req.body.old_price_usd;


    editProduct(prod_id, prod_name, price, old_price, cat_name, description, display_home, weight, stock, price_usd, old_price_usd)
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

router.post('/removecategory', (req, res) => {
    const data = {
        cat_id: req.body.cat_id
    }
    deleteCategory(data).then(feed => {
        if (feed == 'ok') {
            res.json('Category deleted successfuly');
        } else {
            res.json('Unable to delete caterory now try again later');
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

router.post('/contact', async (req, res) => {

    const from = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;
    const full_name = req.body.full_name;

    try {
        console.log('trying to send')
        const response = await contactMail(full_name, from, message, subject);
        if (response === 'OK') {
            res.json('mail sent');
        } else {
            res.json('Unable to complete action at the moment');
        }
    } catch (err) {
        console.log(err)
        res.json('Unable to complete action at the moment');
    }


});

router.post('/changecurrency', async (req, res) => {

    const ip = req.body.ip;
    const currOption = req.body.base_currency;

    const isSet = await getCurrency({ 'ip': ip });

    if (isSet) {
        await updateCurrency(ip, currOption);
        res.json('currency update')
    } else {
        const data = {
            ip: ip,
            base_currency: currOption,
            delivery_fee: 0
        }
        await saveCurrencyOption(data);
        res.json('currency update')
    }


});

router.post('/savedeliveryfee', async (req, res) => {

    const ip = req.body.ip;
    const delivery_fee = req.body.delivery_fee;
    const base_currency = req.body.base_currency;

    const isSet = await getCurrency({ 'ip': ip });

    if (isSet) {
        const change = await setDelivery(ip, delivery_fee);
        res.json('delivery set')
    }else{
        const data = {
            ip: ip,
            delivery_fee: delivery_fee,
            base_currency: base_currency
        }
        await saveCurrencyOption(data);
        res.json('delivery set')
    }

    // const isSet = await setDelivery(ip,delivery_fee);
    // if(isSet == 'ok'){
    //     res.json('delivery set')
    // }else{
    //     res.json('delivery not set')
    // }


   



});

router.post('/getcurrency', async (req, res) => {
    const ip = req.body.ip;
    const isSet = await getCurrency({ 'ip': ip });

    if (isSet) {

        res.json(isSet);
    } else {
        res.json('not set');
    }
});

router.post('/getstockvalue', async (req, res) => {
    const data = {
        prod_id: req.body.prod_id
    }

    const prods = await prodInfo(data);
    res.json(prods.stock);


});

router.get('/testing', (req, res) => {
    res.json({ msg: 'Updated delete test responsible' });
});











module.exports = router;
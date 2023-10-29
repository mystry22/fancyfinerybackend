const express = require('express');
const router = express.Router();
const {getCustomDate} = require('../utility_functions/util_func');
const {createNewProduct,uploadProductImage,deleteProduct,editProduct,homeProducts,allProducts,
    createCategory,allCategories,prodInfo,shopProducts,searchName} = require('../model/ProductHelper');
const {cloudinary} = require('../utility_functions/cloudinary');
const home = require('path').resolve('./');



router.get('/tets', (req,res)=>{
    res.send('ok');
})

router.post('/addproduct',(req,res)=>{
    
    const data = {
        upload_date : getCustomDate(),
        prod_name: req.body.prod_name,
        prod_id: req.body.prod_id,
        price: req.body.price,
        old_price: req.body.old_price,
        cat_name: req.body.cat_name,
        description: req.body.description,
        display_home: req.body.display_home,
        image_link: req.body.image_link,
        price_usd: req.body.price_usd,
        old_price_usd: req.body.old_price_usd
    };

    createNewProduct(data).then(feed =>{
        if(feed == 'ok'){
            res.json('New Product Added');
        }else{
            res.json('Unable To Add Product');
        }
    })
});

router.post('/addprodimage',async(req,res)=>{
    const prod_id = req.body.prod_id;
    const image_name = req.body.file_name
    const datee = Date.now();
    const localhost = 'https://fancybackend.onrender.com/products'
    const uploadPath = localhost + image_name;

    // try{
    //     const response = await cloudinary.uploader.
    //     upload(filestr,{
    //         upload_preset: 'molenu',
    //     });
    //     if(response){
    //         const image_link = response.secure_url;

    //         uploadProductImage(prod_id,image_link).then(feed =>{
    //                 if(feed == 'ok'){
    //                     res.json('Product Image Upload Successful');
    //                 }else{
    //                     res.json('Product Image Upload Not Successful 2');
    //                     }
    //         })
    //     }
        
        
    // }catch(error){
    //     console.log(error)
    // }
    

    try{
        if(req.files === null){
            res.json('Product Image Upload Not Successful 2');
            console.log('not image')
        }

        const file = req.files.image;

        file.mv(home+`/products/${file.name}`,err=>{
            console.error(err);
            
        })
        await uploadProductImage(prod_id,uploadPath)
        res.json('Product Image Upload Successful');

    }
    catch(error){
        console.log('err')
    }

    
   

    
    
   
});

router.post('/deleteproduct',(req,res)=>{
    const data = {
        prod_id: req.body.prod_id
    }
    deleteProduct(data).then(feed =>{
        if(feed == 'ok'){
            res.json('Product Deleted Successfuly');
        }else{
            res.json('Product Not Deleted');
        }
    })
});

router.post('/editproduct',(req,res)=>{
    const prod_id = req.body.prod_id;
    const prod_name = req.body.prod_name;
    const price = req.body.price;
    const old_price = req.body.old_price;
    const cat_name = req.body.cat_name;
    const description = req.body.prod_desc;
    const display_home = req.body.display_home;

    editProduct(prod_id,prod_name,price,old_price,cat_name,description,display_home)
    .then(feed =>{
        if(feed == 'ok'){
            res.json('Product Edited Successfuly');
        }else{
            res.json('Product Not Edited Successfuly');
        }
    })
});

router.post('/homeproducts',async(req,res)=>{
    const products = await homeProducts();
    res.json(products);
});

router.post('/shopproducts',async(req,res)=>{
    const products = await shopProducts();
    res.json(products);
});

router.post('/allproducts',async(req,res)=>{
    const allproducts = await allProducts();
    res.json(allproducts);
});

router.post('/productinfo',async(req,res)=>{
    
    const data = {
        prod_id:req.body.prod_id
    }
    
    const allProducts = await prodInfo(data);
    res.json(allProducts);
});

router.post('/availablecategory',async(req,res)=>{
    const category = await allCategories();
    res.json(category);
});

router.post('/addcategory',(req,res)=>{
    const data = {
        cat_name: req.body.cat_name,
        cat_id: req.body.cat_id
    }
    createCategory(data).then(feed =>{
        if(feed == 'ok'){
            res.json('New Category Added');
        }else{
            res.json('No New Category Added');
        }
    })
});

router.post('/search',async(req,res)=>{
    const prod_name = req.body.prod_name;
    const searchRes = await searchName(prod_name);
    if(searchRes.length > 0){
        res.json(searchRes);
    }else{
        res.json('No product found');
    }
});




module.exports = router;
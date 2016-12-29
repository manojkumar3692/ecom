var router = require('express').Router();
var four0four = require('./utils/404')();
var data = require('./data');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myapp');
//router.get('/people', getPeople);
//router.get('/person/:id', getPerson);
router.post('/admin/addproduct',addProduct);
router.post('/admin/updateproduct',updateProduct);
router.post('/admin/deleteproduct',deleteProduct)
router.get('/products',listProducts);
//router.update('/admin',updateProduct);
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;
 var Schema = mongoose.Schema;
//////////////
var Product = new Schema({
    title    : String,
    description  : String,
    price      : String,
    stock      : String,
    imageUrl  :String
});

function addProduct(req,res,next) {
  
var Productmodel = mongoose.model('product',Product);

var productDetails = new Productmodel(
    {
    title    : req.body.title,
    description  : req.body.description,
    price      : req.body.price,
    stock      : req.body.stock,
    imageUrl  : req.body.imageUrl
})
    
productDetails.save(function(err,result) {
    
    if(err){
        return console.log('error in saving data');
    }else{
        console.log('results');
        console.log(result);
        res.end('Product Added ');
    }
})

    
}

function listProducts(req,res,next) {
    var Productmodel = mongoose.model('product',Product);
    Productmodel.find({},function(err,data) {
    if(err){
        return console.log('error in finding data');
    }else{
        console.log('response');
        res.send({results : data});
        res.end('Over');
    }
})
}

function updateProduct(req,res,next) {    
    var id = req.body.id;
    var Productmodel = mongoose.model('product',Product);
    Productmodel.findById({_id : id} , function (err,foundId){
        if(err) {
            console.log('Object not Found')
        }else {
            foundId.title = req.body.title;
            foundId.save(function (err,result) {
                if(err) {
                    console.log('error in saving')
                }else {
                    res.send('succesfully data updated ....')
                }
            })
        }
    })
    
}

function deleteProduct(req,res,next) {
    var id = req.body.id;
    var Productmodel = mongoose.model('product',Product)
    Productmodel.remove({"_id" : id},function (err,foundId){
        if(err) {
            console.log('Error in deleting');
        }else {
            res.end('Product Deleted ...');
        }
    })
}
/*jshint node:true*/
'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');
var port = process.env.PORT || 8002;
var four0four = require('./utils/404')();
var mongoose = require('mongoose');
var urlencodedParser = bodyParser.urlencoded({extended : true});
var cors = require('cors');
//mongoose.connect('mongodb://localhost/myapp');

//var Schema = mongoose.Schema;
//
//var Product = new Schema({
//    title    : String,
//    description  : String,
//    price      : Number,
//    stock      : Number,
//    imageUrl  :String
//});
//
//var Productmodel = mongoose.model('product',Product);
//
//var productDetails = new Productmodel(
//    {
//    title    : 'Product 4',
//    description  : 'Nice pair of shoes',
//    price      : 2000,
//    stock      : 2,
//    imageUrl  : 'www.google.com/india'
//})


//productDetails.save(function(err,res) {
//    if(err) 
//        return console.log('error in saving');
//    console.log(res);
//});

//productDetails2.save(function(err,res) {
//    if(err) 
//        return console.log('error in saving');
//    console.log(res);
//});



//productDetails.remove({_id : '586265ee5e125f47a069e464'},function(err,res) {
//    if(err) 
//        return console.log('error in deleting');
//    console.log(res);
//});

//Productmodel.findOne({title:'Product 1'},function(err,res) {
//     if(err) 
//        return console.log('error in finding');
//    console.log(res);
//})

//Productmodel.find(function(err,res) {
//     if(err) 
//        return console.log('error in finding');
//    console.log(res);
//})



var environment = process.env.NODE_ENV;

app.use(favicon(__dirname + '/favicon.ico'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cors());

app.use('/api', require('./routes'));

console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

switch (environment) {
  case 'build':
    console.log('** BUILD **');
    app.use(express.static('./build/'));
    // Any invalid calls for templateUrls are under app/* and should return 404
    app.use('/app/*', function(req, res, next) {
      four0four.send404(req, res);
    });
    // Any deep link calls should return index.html
    app.use('/*', express.static('./build/index.html'));
    break;
  default:
    console.log('** DEV **');
    app.use(express.static('./src/client/'));
    app.use(express.static('./'));
    app.use(express.static('./tmp'));
    // Any invalid calls for templateUrls are under app/* and should return 404
    app.use('/app/*', function(req, res, next) {
      four0four.send404(req, res);
    });
    // Any deep link calls should return index.html
    app.use('/*', express.static('./src/client/index.html'));
    break;
}

app.listen(port, function() {
  console.log('Express server listening on port ' + port);
  console.log('env = ' + app.get('env') +
    '\n__dirname = ' + __dirname +
    '\nprocess.cwd = ' + process.cwd());
});

var express = require('express');
var router = express.Router();
const util = require('util')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' });
});

/* GET Hello World page. */
router.get('/chart', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');

    collection.find({},{},function(e,docs){
        console.log("docs are: " + docs);
        console.log(JSON.parse(docs))
        console.log("error is: " + e)
        res.send("test")
        });
});

/* GET Userlist page.
router.get('/test', function(req, res) {
    var db = req.db;

    var collection = db.get('wemorecord_25.1.2017_20:11');

    collection.find({},{},function(e,docs){
        console.log("docs are: " + docs);
        console.log(JSON.parse(docs))
        console.log("error is: " + e)
        res.render('wemoentries', {
            "wemoentries" : docs
        });
    });
});
 NOT WORKING */


/* GET Userlist page. */
router.get('/wemoentries', function(req, res) {
    var db = req.db;
    var collection = db.get('wemorecord_25.1.2017_9:51');

    /*collection.find({},{}).toArray(function(err, docs){
        console.log(docs.length);
    });
    */


    /*var cursor = collection.find();


    // Execute the each command, triggers for each document
    cursor.each(function(err, item) {
        //console.log(util.inspect(item, false, null));
        var array = new Array();
        array = JSON.stringify(item);
        console.log("Array is: ", array);
        //console.log("Item is: " + item);
    });
    */


    collection.find({},{},function(e,docs){
        //console.log("docs are: " + docs);
        res.status(200).json({'usercollection' : docs});
    });
    
});

module.exports = router;

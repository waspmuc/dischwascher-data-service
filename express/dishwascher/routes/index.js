var express = require('express');
var router = express.Router();

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

/* GET Userlist page. */
router.get('/wemoentries', function(req, res) {
    var db = req.db;

    var collection = db.get('usercollection');

    collection.find({},{},function(e,docs){
        console.log("docs are: " + docs);
        console.log(JSON.parse(docs))
        console.log("error is: " + e)
        res.render('wemoentries', {
            "wemoentries" : docs
        });
    });
});
module.exports = router;

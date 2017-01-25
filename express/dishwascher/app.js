var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// New Code
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/wemo');

var routes = require('./routes/index');
var users = require('./routes/users');

var CronJob = require('cron').CronJob;
var http = require("http");

var options = {
    hostname: '192.168.233.18' //IP@home
    , port: '5000'
    , path: '/api/environment'
    , method: 'GET'
    , headers: {'Content-Type': 'application/json'}
};

var firstRun = true;
var now;

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Make our db accessible to our router
app.use(function (req, res, next) {
    req.db = db;
    next();
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', routes);
app.use('/users', users);
app.use(express.static('public'));




app.listen(3001, function(){
    console.log('Express listening on port', this.address().port);
});

try {
    new CronJob('* * * * * *', function () {

        var req = http.request(options, function (res) {
            res.setEncoding('utf8');
            res.on('data', function (data) {
                try {
                    var wemoresponse = JSON.parse(data)

                    wemoresponse.wemodischwascher.createdAt = new Date();


                    if (wemoresponse.wemodischwascher.currentpower > 200) {
                        if (firstRun == true) {
                            console.log("Creating new Collection for MongoDB")
                            now = new Date();
                            firstRun = false;
                        }
                        //console.log(now);
                        var collection = db.get('wemorecord_' + now.getDate() + "." + (now.getMonth() + 1) + "." + now.getFullYear() + "_" + now.getHours() + ":" + now.getMinutes());
                        collection.insert(
                            wemoresponse
                            , function (err, doc) {
                                if (err) {
                                    console.log("There was a problem adding the information to the database." + err);

                                }
                                else {
                                    console.log("success");
                                }
                            });

                    }
                    else {
                        firstRun = true;
                        //console.log("firstRun set to True")
                    }
                }
                catch (e) {
                    console.error("Error happend:  " + e);
                }
            });

        });

        req.on('error', function (e) {
            //console.log('problem with request: ' + e.message);
        });
        req.end();
    }, null, true, null);
} catch (e) {

    console.log("Error while receiving dishwasher data:  " + e)
}


/// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
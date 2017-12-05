// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var cors       = require('cors');
var app        = express();                 // define our app using express
app.use(cors());
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
const saltRounds = 10;

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = 8081;        // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/message');

var User = require('./user');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// on routes that end in /messages
// ----------------------------------------------------
router.route('/users')

    // create a message (accessed at POST http://localhost:8080/api/messages)
    .post(function(req, res) {
        console.log(req.body);
        
        var user = new User();      // create a new instance of the Message model
        user.username = req.body.username;  // set the messages msg (comes from the request)
        user.password = req.body.password;

        // save the message and check for errors
        user.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Message created!' });
        });

    })
    .get(function(req, res) {
        User.find(function(err, users) {
            if (err)
                res.send(err);

            res.json(users);
        });
    });
    
// on routes that end in /messages/:message_id
// ----------------------------------------------------
router.route('/users/:username/:password')

    // get the message with that id (accessed at GET http://localhost:8080/api/messages/:message_id)
    .get(function(req, res) {
        User.find({username:{ $eq:req.params.username}}, function(err, user) {
            if (err)
                res.send(err);
            bcrypt.compare(req.params.password, user.password, function(err, resp) {
                
            });
            res.json(user);
        });
    })
    
    .put(function(req, res) {

        // use our message model to find the message we want
        User.findById(req.params.user_id, function(err, user) {

            if (err)
                res.send(err);

            user.username = req.body.username;  // update the messages info

            // save the message
            user.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Message updated!' });
            });

        });
    })
    .delete(function(req, res) {
        User.remove({
            _id: req.params.user_id
        }, function(err, user) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

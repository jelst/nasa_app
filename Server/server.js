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


router.route('/users')

    // create a message (accessed at POST http://localhost:8080/api/messages)
    .post(function(req, res) {
        console.log(req.body);
        
        var user = new User();      // create a new instance of the User model
        user.username = req.body.username;  // set the messages username (comes from the request)
        user.password = req.body.password;

        // save the message and check for errors
        user.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'User created!' });
        });

    });
    
router.route('/users/:username/:password')

    .get(function(req, res) {
        User.find({username:{ $eq:req.params.username}}, function(err, user) {
            if (err)
                res.send(err);
                
            res.json(user);
        });
    })
    
    

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

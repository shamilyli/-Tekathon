var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/one-day');

var userSchema = {
    username: String,
    password: String,
    email: String,
    partner: String,
    preferences: Array,
    activitiesAddedToCalendar: Array
}

// var activityEnum = Object.freeze({RESTAURANT, MOVIE, EVENT});
//
// var activitySchema = {
//     name: String,
//     type: activityEnum,
//     location: {
//         lat: Number,
//         lng: Number
//     },
//     datetime: {
//         startTime: String,
//         endTime: String
//     },
//     tag: String
// }
//
// var tagSchema = {
//     type: activityEnum,
//     name: String
// }

var Users = mongoose.model('Users', userSchema, 'users');
// var Activities = mongoose.model('Activities', activitySchema, 'activities');
// var Tags = mongoose.model('Tags', tagSchema, 'tags');

/* GET home page */
router.get('/', function(req, res, next) {
    res.render('index', {title: 'One Day'});
});

/* GET login form */
router.get('/login', function(req, res, next) {
   res.render('login', {user: {}, action: '/login', title: 'One Day'})
});

/* POST add user and redirect to recommendations page upon login */
router.post('/login', function(req, res, next) {
    var newUser = new Users(req.body);
    newUser.save(function (err, doc) {
        if (err) {

        } else {
            res.redirect('/' + doc._id + '/recommendations');
        }
    });
});

/* GET student object and get their recommendations page */
router.get('/:id/recommendations', function(req, res, next) {
    Users.findById(req.params.id).exec(function (err, doc) {
        res.render('recommendations', {user: doc, title: 'One Day'});
    });
});

/* GET footprints page */
router.get('/:id/footprints', function(req, res, next) {
    Users.findById(req.params.id).exec(function (err, doc) {
        res.render('footprints', {user: doc, partner: doc.partner, title: 'One Day'});
    });
});

/* GET user object and insert it into preference form */
router.get('/:id', function(req,res, next) {
    Users.findById(req.params.id).exec(function(err, doc) {
        res.render('preferences', {user: doc, action: '/' + doc._id, title: 'One Day'});
    });
});

/* POST user object to current object in database, updating preferences form */
router.post('/:id', function(req, res, next) {
    Users.update({_id: req.params.id}, {$set: req.body}).exec(function(err, doc) {
        if (err) {

        } else {
            res.redirect(req.params.id);
        }
    });
});

module.exports = router;

var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy


// MySQL 연결
var mysql = require('mysql')

var connection = mysql.createConnection({
    host:'localhost',
    port:3308,
    user:'root',
    password:'qwer1234',
    database:'nodejs'
})
connection.connect()


router.get('/', function(request, response){

    var msg;
    var errMsg = request.flash('error')
    if(errMsg) msg = errMsg;
    response.render('login.ejs', {'message' : msg})

})


passport.serializeUser(function(user, done){
    console.log('passport session saved : ' , user.id)
    done(null, user.id)
})

passport.deserializeUser(function(id, done){
    console.log('passport session get id : ' , id)
    done(null, id)
})




passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
    }, function(request, email, password, done){
        var query = connection.query('select * from user where EMAIL=?', [email], function(error, rows){
            if (error) return done(error)

            if (rows.length){
                return done(null, {'email' : email, 'id' : rows[0].UID})
                console.log(rows[0])
            } else {
                return done(null, false, {'message' : 'Your Login Info is not found'})
            }
        })
    }
))



router.post('/', function(request, response, next) {
    passport.authenticate('local-login', function(error, user, info){
        if(error) response.status(500).json(error)
        if(!user) return response.status(401).json(info.message)

        request.logIn(user, function(error){
            if (error) {return next(err)}
            return response.json(user)
        })
    }) (request, response, next)
})



module.exports = router;
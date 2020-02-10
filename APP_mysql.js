var express = require('express')
var app = express()
var bodyparser = require('body-parser')
var Router = require('./router/index_mysql')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var session = require('express-session')
var flash = require('connect-flash')


// 3000번 포트 바라보게 하기
app.listen(3000, function(){
    console.log("MySQL, Start express server on port 3000 !!")
});


app.use(express.static('public'))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.set('view engine', 'ejs')

app.use(session({
    secret : 'keyboard cat',
    resave : false,
    saveUninitialized : true
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use(Router)


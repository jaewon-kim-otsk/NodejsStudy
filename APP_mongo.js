var express = require('express')
var app = express()
var bodyparser = require('body-parser')
var Router = require('./router/index_mongo')


// 5000번 포트 바라보게 하기
app.listen(5000, function(){
    console.log("MongoDB, Start express server on port 5000 !!")
});


app.use(express.static('public'))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.set('view engine', 'ejs')


app.use(Router)
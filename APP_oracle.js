var express = require('express')
var app = express()
var bodyparser = require('body-parser')
var Router = require('./router/index_oracle')


// 4000번 포트 바라보게 하기
app.listen(4000, function(){
    console.log("Oracle, Start express server on port 4000 !!")
});


app.use(express.static('public'))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.set('view engine', 'ejs')


app.use(Router)
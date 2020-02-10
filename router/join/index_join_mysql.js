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


// URL 끝에, /join 이 입력되는 경우
// index_mysql.js 파일을 통해 자료를 get.
router.get('/', function(request, response){
    //console.log('"Get" join url')

    // '제출' 버튼을 클릭했는데, 에러가 발생한 경우.
    var msg;
    var errMsg = request.flash('error')
    if(errMsg) msg = errMsg;
    response.render('join_mysql.ejs', {'message' : msg})
    //response.sendFile(path.join(__dirname, '../../public/join_mysql.html'))
})


// 사용자가 입력한 값이 DB 상에 없는 경우, callback 함수를 부르게 되s는데
// (여기서는 insert into user ~ 에 대한 것)
// 그 때, serialize 라는 method 가 자동으로 사용된다.
passport.serializeUser(function(user, done){
    console.log('passport session saved : ' , user.id)
    done(null, user.id)
})

passport.deserializeUser(function(id, done){
    console.log('passport session get id : ' , id)
    done(null, id)
})



// 사용자가 화면에서 입력한 값을 받아서 처리하는 부분
passport.use('local-join', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
    }, function(request, email, password, done){
        var query = connection.query('select * from user where EMAIL=?', [email], function(error, rows){
            if (error) return done(error)

            if (rows.length){
                // console.log('existed user')
                return done(null, false, {message : 'your email is already used'})
            } else {
                // console.log('None')
                var sql = {EMAIL : email, PW : password}
                var query = connection.query('insert into user set ?', sql, function(error, rows){
                    if (error) throw error
                    return done(null, {'email' : email, 'id' : rows.insertId})
                    // 여기서 return 되는 email 과 id 가 위쪽의 serializeUser 와 deserializeUser 에 사용됨
                })
            }
        })
    }
))


// 사용자가 정보를 입력하고 난 후, "제출" 버튼을 클릭하면
// DB 에서 정보를 조회한 후, 문제가 없으면 /main 으로, 문제가 있으면 /join 으로 이동
router.post('/', passport.authenticate('local-join', {
    successRedirect : '/main', 
    failureRedirect : '/join',
    failureFlash : true })
)


// 사용자가 정보를 입력하고 난 후, "제출" 버튼을 클릭하면
// post 방식으로 '/join' 을 join_mysql.html 으로부터 넘겨주는 경우
// router.post('/', function(request, response){
//     //console.log(request)
//     var body = request.body
//     ,   email = body.email
//     ,   name = body.name
//     ,   passwd = body.password


//     // Table 에 UID 가 자동으로 증하가지 않는다면, 다음의 명령어를 사용
//     // ALTER TABLE user MODIFY UID INT NOT NULL AUTO_INCREMENT;

//     // 기본적으로는 values 를 사용해도 되지만 , set 도 사용 가능하다
//     // var Query = connection.query('insert into user (EMAIL, NAME, PW) values ("'+ email + '" , "' + name + '" , "' + passwd + '")', function(error, rows){}
//     // set 을 사용할 때는 아래와 같이 escape 문자인 ? 를 사용하면 된다.
//     var sql = {EMAIL : email, NAME : name, PW : passwd}  // {table의 컬럼명 : 사용자가 입력한 값이 저장되는 변수명}
//     var Query = connection.query('insert into user set ?', sql, function(error, rows){
//          if(error) throw error
//          else response.render('welcome_mysql.ejs', {'name' : name, 'id' : rows.insertId })
//      })
// })

module.exports = router;
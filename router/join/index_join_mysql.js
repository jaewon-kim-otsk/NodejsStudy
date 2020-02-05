var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')


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
    response.sendFile(path.join(__dirname, '../../public/join_mysql.html'))
})

// 사용자가 정보를 입력하고 난 후, "제출" 버튼을 클릭하면
// post 방식으로 '/join' 을 join_mysql.html 으로부터 넘겨주는 경우
router.post('/', function(request, response){
    //console.log(request)
    var body = request.body
    ,   email = body.email
    ,   name = body.name
    ,   passwd = body.password


    // Table 에 UID 가 자동으로 증하가지 않는다면, 다음의 명령어를 사용
    // ALTER TABLE user MODIFY UID INT NOT NULL AUTO_INCREMENT;

    // 기본적으로는 values 를 사용해도 되지만 , set 도 사용 가능하다
    // var Query = connection.query('insert into user (EMAIL, NAME, PW) values ("'+ email + '" , "' + name + '" , "' + passwd + '")', function(error, rows){}
    // set 을 사용할 때는 아래와 같이 escape 문자인 ? 를 사용하면 된다.
    var sql = {EMAIL : email, NAME : name, PW : passwd}  // {table의 컬럼명 : 사용자가 입력한 값이 저장되는 변수명}
    var Query = connection.query('insert into user set ?', sql, function(error, rows){
         if(error) throw error
         else response.render('welcome_mysql.ejs', {'name' : name, 'id' : rows.insertId })
     })
})

module.exports = router;
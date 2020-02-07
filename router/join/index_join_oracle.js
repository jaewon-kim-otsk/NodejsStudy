var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')


// Oracle 연결
const oracledb = require('oracledb');


// URL 끝에, /join 이 입력되는 경우
// index_oracle.js 파일을 통해 자료를 get.
router.get('/', function(request, response){
    response.sendFile(path.join(__dirname, '../../public/join_oracle.html'))
})


// 사용자가 정보를 입력하고 난 후, "제출" 버튼을 클릭하면
// post 방식으로 '/join' 을 join_oracle.html 으로부터 넘겨주는 경우
router.post('/', async function(request, response){

    let conn

    try {
        conn = await oracledb.getConnection(  {
        user          : "ESVCWEB",
        password      : 'ESVCWEB12#$',
        connectString : "IZAEDID"
        })

        // Oracle 연결 시, 필수로 해줘야 하는 부분
        oracledb.autoCommit = true

        // 사용자가 join 화면에서 입력한 값
        var body = request.body
        var email = body.email
        var name = body.name
        var passwd = body.password
 
        // console.log(email)
        // console.log(name)
        // console.log(passwd)

        const SelectSqlQuery = 'SELECT MAX(ID)+1 FROM NODEJS_TEST'
        const SelectResult = await conn.execute(SelectSqlQuery);
        const SelectIdResult = SelectResult.rows

        const sqlQuery = `INSERT INTO NODEJS_TEST(ID, EMAIL, NAME, PASSWORD) VALUES ('${SelectIdResult}', '${email}', '${name}', '${passwd}')`;
        const result = await conn.execute(sqlQuery);

        response.render('welcome_oracle.ejs', {'name': name, 'id' : SelectIdResult})
        // console.log(sqlQuery)
        // console.log(result)
        
      } catch (err) {
        console.log('Ouch!', err)
      } finally {
        if (conn) { // conn assignment worked, need to close
         await conn.close()
        }
      }

})


module.exports = router;
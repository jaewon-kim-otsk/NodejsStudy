var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')


// Oracle 연결
const oracledb = require('oracledb');
// const config = {
//     user: "ESVCWEB",
//     password: "ESVCWEB12#$",
//     connectString :"IZAEDID"
//    };

//     // Oracle 에서 데이터 가져오는 부분
//     async function getEmployee (empId) {
//       let conn

//       try {
//         conn = await oracledb.getConnection(  {
//         user          : "ESVCWEB",
//         password      : 'ESVCWEB12#$',
//         connectString : "IZAEDID"
//         });
    
//         const result = await conn.execute(
//           'select * from E_USER where EU_ID = :id',
//           [empId]
//         )
    
//         // 결과
//         //console.log(result.rows[0][6])
//         return result.rows[0][6]

//       } catch (err) {
//         console.log('Ouch!', err)
//       } finally {
//         if (conn) { // conn assignment worked, need to close
//           await conn.close()
//         }
//       }
//     };
    //getEmployee('2014513')



// 화면에서, <제출> 버튼을 누르는 경우
router.post('/form', function(request, response){
    // 작성자가 입력한 Email 주소
    //console.log(request.body.email)

    // 서버에서 클라이언트에게 반응
    //response.send("<h1> Welcome " + request.body.email + "</h1>")

    // View Engine 사용
    //console.log(request.body.UserId)
    // const UserEmailAdd = getEmployee(request.body.UserId).then(function(){result})
    // console.log(UserEmailAdd)
    response.render('email_oracle.ejs', {'UserEmail' : request.body.UserId})
    
    // 단순확인
    //response.send("post resonse")

})


// 화면에서, <AjaxSend> 버튼을 누르는 경우
router.post('/ajax', async function(request, response){   
    // var responseData = {'result' : 'OK', 'email' : request.body.User}
    // response.json(responseData)

    // Oracle
    let conn

    try {
      conn = await oracledb.getConnection(  {
      user          : "ESVCWEB",
      password      : 'ESVCWEB12#$',
      connectString : "IZAEDI_DEV"
      });

      // oracle 에 연결 시 필수로 해줘야 하는 부분
      oracledb.autoCommit = true;

      // 사용자가 입력한 값을 저장
      var body = request.body;
      var email = body.email;
      var name = body.name;
      var passwd = body.password;

      console.log(email);
      console.log(name);
      console.log(passwd);

      // EDI-DEV 환경에 있는 테이블
      const sqlQuery = `INSERT INTO NODEJS_TEST(ID, EMAIL, NAME, PASSWORD) VALUES (ID.nextval, '${email}', '${name}', '${passwd}')`;
      console.log(sqlQuery);
      const result = await conn.execute(sqlQuery);

    } catch (err) {
      console.log('Ouch!', err)
    } finally {
      if (conn) { // conn assignment worked, need to close
       res.render('welcome.ejs', {'name': name})
       await conn.close()
      }
    }


    var UserInfo = await getEmployee(request.body.User);
    var responseData = {};

    if(UserInfo){
      console.log('A')
      responseData.result = "OK"
      responseData.name = UserInfo
    } else {
      console.log('B')
      responseData.result = "NONE"
      responseData.name = ""
    }
    response.json(responseData)
})

module.exports = router;
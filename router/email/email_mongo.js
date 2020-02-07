var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')


// MongoDB 연결
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://OtskEdiUser1:qwer1234@studynodejs-nl1q2.gcp.mongodb.net/test?retryWrites=true&w=majority');

// 연결된 Collection 가져오기
var db = mongoose.connection;


// 연결 실패
db.on('error', function(){
  console.log('Connection Failed!');
});

// 연결 - 성공
db.once('open', function() {
  console.log('Connected!');
});

// Schema 생성자를 통해서 UserSchema 객체를 정의
var UserSchema = mongoose.Schema({
  EU_ID : 'string',
  NAME : 'string',
  EMAIL : 'string'
});

// 정의된 스키마를 객체처럼 사용할 수 있도록 model() 함수로 컴파일
var UserInfo = mongoose.model('Schema', UserSchema);


// 연결된 collection 정보표시
// console.log(db)


// UserInfo 객체를 new 로 생성해서 값을 입력
// var NewUserInfo = new UserInfo({EU_ID:'2013803',NAME:'김상현',EMAIL:'shkim@cyberlogitec.com'});


// 데이터 저장
// NewUserInfo.save(function(error, data){
//   if(error){
//     console.log(error);
//   }else{
//     console.log('Saved!')
//   }
// });


// NewUserInfo 레퍼런스 전체 데이터 가져오기
// UserInfo.find(function(error, getData){
//   console.log('--- Read all ---');
//   if(error){
//       console.log(error);
//   }else{
//       console.log(getData);
//   }
// })


// 특정 아이디값 가져오기
// UserInfo.findOne({_id:'5e33fcb948de1c46ac6f8ee0'}, function(error, getData){
//   console.log('--- Read Only one ---');
//   if(error){
//       console.log(error);
//   }else{
//       console.log(getData);
//   }
// });


// // 특정아이디 수정하기
// UserInfo.findById({_id:'5e33fcb948de1c46ac6f8ee0'}, function(error, getData){
//   console.log('--- Update (PUT) ---');
//   if(error){
//       console.log(error);
//   }else{
//     getData.NAME = '--modified--';
//     getData.save(function(error, Modified_UserInfo){
//           if(error){
//               console.log(error);
//           }else{
//               console.log(Modified_UserInfo);
//           }
//       });
//   }
// });


// 특정아이디 삭제
// UserInfo.remove({_id:'5e33fcb948de1c46ac6f8ee0'}, function(error, output){
//   console.log('--- Delete ---');
//   if(error){
//       console.log(error);
//   }
//   console.log('--- deleted ---');
// });



// 화면에서, <제출> 버튼을 누르는 경우
router.post('/user_post', function(request, response){
    // 작성자가 입력한 Email 주소
    //console.log(request.body.email)

    // 서버에서 클라이언트에게 반응
    //response.send("<h1> Welcome " + request.body.email + "</h1>")

    // View Engine 사용 
    response.render('email_mongo.ejs', {'UserIdInfo' : request.body.UserEmailAddress})
    
    // 단순확인
    //response.send("post resonse")

})


// 화면에서, <AjaxSend> 버튼을 누르는
router.post('/ajax', function(request, response){
    //console.log(request.body.UserID)
    
    // var responseData = {'result' : 'OK', 'UserID' : request.body.UserID}
    // response.json(responseData)

    // MongoDB
    var UserInput = request.body.UserEmailAddress;
    var responseData = {};

     UserInfo.findOne({EMAIL:UserInput}, function(error, getResponse){
       console.log('--- Read Only one ---');
       //console.log(getResponse)
       if(getResponse==null){
           responseData.result = "NONE"
           responseData.name = ""
       }else{
           //console.log(getResponse);
           responseData.result = "OK"
           responseData.name = getResponse.NAME
       }
       response.json(responseData)
     });
})

module.exports = router;
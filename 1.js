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
UserInfo.find(function(error, getData){
  console.log('--- Read all ---');
  if(error){
      console.log(error);
  }else{
      console.log(getData);
  }
})


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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// MongoDB 연결
// const mongoose = require('mongoose');
// const conn = mongoose.createConnection('mongodb+srv://OtskEdiUser1:qwer1234@studynodejs-nl1q2.gcp.mongodb.net/test?retryWrites=true&w=majority', { 
//   useNewUrlParser : true,
//   //userFindAndModify : false
//   useUnifiedTopology : true
//   })
// //const conn = mongoose.createConnection('mongodb+srv://ediadm:ediadm@cluster0-fpa0d.gcp.mongodb.net/test?retryWrites=true&w=majority')


// // MongoDB 구동
// const Schema = mongoose.Schema;
// const Model = mongoose.Model;

// const schema = new Schema({
//   name: String
// });

// class UserTable extends Model { }
// const ABC = conn.model(UserTable, schema);
// process.stdout.write('connection model names: ');
// console.log(conn.modelNames());

// const XyZTable = new ABC({
//   name: 'Connection_Test'
// });

// async function run() {
//   //await conn.dropDatabase();

//   // 값 저장
//   await XyZTable.save();

//   // 값을 찾아서 CMD 창에 출력 후 종료
//   let found = await ABC.findOne();
//   console.log(found);
//   return conn.close();
// }
// run();

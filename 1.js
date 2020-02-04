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

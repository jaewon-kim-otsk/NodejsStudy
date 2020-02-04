// 과제내용
// 1. express 설정
// 2. 필요한 npm 모듈 설치
// 3. input UI 만들기 (검색창)
// 4. 검색결과를 받아서 dummy json 형태를 내려주기
// 5. 화면에 그 결과를 노출하기


// 선언
var express = require('express')
var fs = require('fs')
var main = express()
var bodyparser = require('body-parser')


main.use(bodyparser.json())
main.use(bodyparser.urlencoded({extended:true}))
main.set('view engine', 'ejs')


// Listen
main.listen(4000, function(){
    console.log("Listening Port 4000")
})

// 첫페이지 접속 시
main.get('/', function(request, response){
    response.sendFile(__dirname + "/Assignment1_Main.html")
})
main.get('/main', function(requst, response){
    response.sendFile(__dirname + "/Assignment1_Main.html")
})


main.post('/QuerySubmit', function(request, response){
    // 작성자가 입력한 Email 주소
    //console.log(request.InputName)

    // 서버에서 클라이언트에게 반응
    //response.send("<h1> Welcome " + request.body.email + "</h1>")

    // View Engine 사용
    //response.render('Assignment1_Data.ejs', {'InputName' : request.body.InputName})
    //response.render('Assignment1_Data.ejs', {'InputName' : request.body.InputName})
    
    // 단순확인
    // response.send("Connected")
})


main.post('/QueryData', function(request, response){
    
    // 사용자가 입력한 값 가져오기
    //console.log(request.body.UserInput)

    fs.readFile('Assignment1_OriginalData.json', function(error, description){
        if (error) throw error;
        var TargetTotalData = JSON.parse(description.toString());
        
        for(var i=0 ; i < TargetTotalData.length ; i++){
            var TargetName = TargetTotalData[i].name;
            var TargetAge = TargetTotalData[i].age;
            
            if(TargetName == request.body.UserInput){
                var responseData = {'result' : 'OK', 'Name' : request.body.UserInput, 'Age' : TargetAge}
                break
            } else {
                var responseData = {'result' : 'NG', 'Name' : request.body.UserInput}
            }
        }
        response.json(responseData)
    })
})

//     // 작성자가 입력한 Email 주소
//     //console.log(request.body.email)

//     // 서버에서 클라이언트에게 반응
//     //response.send("<h1> Welcome " + request.body.email + "</h1>")

//     // View Engine 사용 
//     //response.render('email.ejs', {'email' : request.body.email})
    
//     // 단순확인
//     //response.send("TEST")

// })
/* connect를 사용하여 서버구동하는 방법

   터미널에서 설치는 다음의 명령어를 사용
   npm install connect
*/
var connect = require('connect');
var http = require('http');

var app = connect();

function about(request, response){
  console.log("A user requeste a page, 'about'");
}

function email(request, response){
  console.log("A user requeste a page, 'email'");
}

app.use("/about", about);
app.use("/email", email);


http.createServer(app).listen(8888);
console.log("Activated");





/* http를 사용하여 서버구동하는 방법
var http = require('http');
var fs = require('fs');


// 웹페이지가 없을 때, 404
function Send404Response(response){
  response.writeHead(404,{"Content-Type":"text/plain"});
  response.write("404 ERROR  /  Bad Request");
  response.end();
}


// 사용자 요구에 응답처리
function onRequest(request, response){
  if(request.method == "GET" && request.url == "/"){
    response.writeHead(200, {"Content-Type":"text/html"});
    fs.createReadStream("./index.html").pipe(response);
  }
  else{
    Send404Response(response);
  }
}

http.createServer(onRequest).listen(8888);
console.log("서버를 작동시켰습니다.");
*/

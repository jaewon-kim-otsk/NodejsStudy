var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')


// URL 끝에, /join 이 입력되는 경우
// index_mongo.js 파일을 통해 자료를 get.
router.get('/', function(request, response){
    response.sendFile(path.join(__dirname, '../../public/join_mongo.html'))
})


// 사용자가 정보를 입력하고 난 후, "제출" 버튼을 클릭하면
// post 방식으로 '/join' 을 join_mysql.html 으로부터 넘겨주는 경우
router.post('/', function(request, response){
    //console.log(request)
    var body = request.body
    ,   LOGINID = body.loginid
    ,   NAME = body.name
    ,   EMAIL = body.email


    // console.log(LOGINID)
    // console.log(NAME)
    // console.log(EMAIL)


    // MongoDB 연결 시작
    const {MongoClient} = require('mongodb');

    async function main(){
       const uri = "mongodb+srv://OtskEdiUser1:qwer1234@studynodejs-nl1q2.gcp.mongodb.net/test?retryWrites=true&w=majority";
       const client = new MongoClient(uri);

       try {
           // MongoDB Client 연결
           await client.connect();

           // Database 연결
           await listDatabases(client);

           // 사용자가 입력한 Login ID 로 collection 에서 데이터를 읽기
           await findOneListingByName(client, `${LOGINID}`);

       } catch (e) {
           console.error(e);
       } finally {
           await client.close();
       }
    }

    async function listDatabases(client){
       databasesList = await client.db().admin().listDatabases();

       console.log("DataBases are,");
       databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    };

    // 파일 찾기
    // 'schemas' 라는 collection 에 접속해서, 사용자가 입력한 Login ID 가 포함된 Document 전체를 가져오기
    async function findOneListingByName(client, nameOfListing) {
       result = await client.db("test").collection("schemas").findOne({ EU_ID : nameOfListing  });
       // console.log(result)

       if (result) {
           response.render('welcome_mongo.ejs', {'name': result.NAME, 'email':result.EMAIL, 'id' : result._id})
           //console.log(result);
           //console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
       } else {
           console.log(`No listings found with the name '${nameOfListing}'`);
       }
    }

    main().catch(console.error);


})

module.exports = router;
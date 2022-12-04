const express = require("express");
const bodyParser = require("body-parser");
const request = ("request");
const https = require("https")
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
const  name1 = req.body.one;
const   name2= req.body.two;
const   name3 = req.body.three;
const   data = {
    members: [
      {
        email_address: name3,
        status: "subscribed",
        merge_fields: {
          FNAME: name1,
          LNAME: name2
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us21.api.mailchimp.com/3.0/lists/a58f8e21ce"
  const options = {
    method: "POST",
    auth: "SankarRJ:b3613a1b977eb8d6e130cf0f1c6bb64e-us21",
  }
  const request = https.request(url, options, function(response){

  if(response.statusCode === 200){
  res.sendFile(__dirname + "/success.html")
  }else{
    res.sendFile(__dirname + "/failure.html")
  }
response.on("data",function(data){
  console.log(JSON.parse(data));
});
  });
  request.write(jsonData);
  request.end();
});

app.post("/failure",function(req,res){
  res.redirect("/")
})


app.listen(process.env.PORT || 3000,function(){
  console.log("server is running on port 3000.");
});


//listID
 // a58f8e21ce.

//ApiID
// b3613a1b977eb8d6e130cf0f1c6bb64e-us21

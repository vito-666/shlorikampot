var express = require("express");

var app = express();

app.use(express.static("public"));

app.get("/",function(req,res){
    res.redirect("index.html")
});

app.listen(3000, function(){
    console.log("examle is running on 3000");
    
})
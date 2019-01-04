var path = require("path");
var express = require("express");

var port = 8023;

var app = express();

app.use(express.static('./'));
app.use(express.static(path.join(__dirname, "/Views")));
app.use(express.static(path.join(__dirname, "/Scripts")));

app.get("/", function(req,res){
    res.sendFile(path.join(__dirname, "/Views", "/index.html"));
  });
  
  app.listen(port);
  
  console.log("Running at Port " + port);
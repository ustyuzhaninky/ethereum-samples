var path = require("path");
var express = require("express");
var cors = require('cors')
var port = 8000;

var app = express();

// var allowCrossDomain = function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Origin", "http://localhost:8000/*");
//     res.header("Access-Control-Allow-Origin", "http://localhost:8545/*");
//     res.header('Access-Control-Allow-Credentials', false)
//     res.header('Access-Control-Allow-Headers', 'Content-Type')
//     res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With, X-Auth");
//     res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
//     next();
// }

// app.use(allowCrossDomain);
// app.use(cors({
//   origin: '*',
//   credentials: false,
// }));

app.use(cors({
  origin: 'http://localhost:8000/',
  credentials: false,
}));

// app.use(cors({
//   origin: 'http://localhost:8545/',
//   credentials: true,
// }));

app.use(express.static('./'))
app.use(express.static(path.join(__dirname, "/Views")));
app.use(express.static(path.join(__dirname, "/Scripts")));

app.get("/", function(req, res){
    res.render(path.join(__dirname, "/Views", "/index.html"))
    // res.sendFile(path.join(__dirname, "/Views", "/index.html"));
  });

  app.listen(port);

  console.log("Running at Port " + port);

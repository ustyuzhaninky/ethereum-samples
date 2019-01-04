var ganache = require("ganache-cli");
var server = ganache.server();
var port = 8545
server.listen(port, function(err, blockchain) {
    console.log(blockchain)
    if(err){
        console.log(err)
    }
});
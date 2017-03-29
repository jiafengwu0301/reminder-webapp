var express = require('express');
var path = require('path');
var app = express();

app.set('port', (process.env.PORT || 8000));

app.use(express.static(__dirname+'/public'));

app.get('/', function(req, res){
    res.sendFile('/index.html');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

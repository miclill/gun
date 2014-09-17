console.log("If modules not found, run `npm install` in example/admin folder!!!");
var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.VCAP_APP_PORT || process.env.PORT || 8888;
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var Gun = require('gun');
var gun = Gun({
	s3: (process.env.NODE_ENV === 'production')? null : require('../../test/shotgun') // replace this with your own keys!
});

app.use(express.static(__dirname))
   .use(bodyParser.json())
   .use(gun.server);
app.listen(port);

console.log('Express started on port ' + port + ' with /gun');

gun.load('blob/data').blank(function(){
	gun.set({ hello: "world", from: "Mark Nadal" }).key('blob/data');
});
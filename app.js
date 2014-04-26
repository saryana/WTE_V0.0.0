var express = require('express'),
	constants = require('./config/constants')
	ntr	= require('nutritionix')({
		appId: constants.APPID,
		appKey: constants.APP_KEY
	}, true),
	path  = require('path'),
	app = express();

app.set('port', 8008);
app.use(express.static(path.join(__dirname + 'public')));

app.get('/', function(req, res) {
	res.sendfile('views/index.html', {title:'WTE'});
});

app.listen(app.get('port'), function () {
	console.log('I love boobies so I run on port ' + app.get('port'));
});

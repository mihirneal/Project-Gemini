var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/aboutMe', function(req, res) {
	res.render('about');
});

app.get('/projects', function(req, res) {
	res.render('projects');
});

app.get('/journal', function(req, res) {
	res.render('journal');
});

app.get('/journal/:id/:title', function(req, res) {
	var id = req.params.id;
	res.render('Article' + id);
});

app.get('*', function(req, res) {
	res.render('pageDoesNotExist');
});

app.listen(443, function() {
	console.log('Server Initiated');
});

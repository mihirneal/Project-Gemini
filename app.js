var express = require('express'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	bodyParser = require('body-parser'),
	LocalStrategy = require('passport-local'),
	passportLocalMongoose = require('passport-local-mongoose'),
	User = require('./models/user');

mongoose.connect('mongodb://localhost/journal', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
var app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	require('express-session')({
		secret: 'NASA and SpaceX',
		resave: false,
		saveUninitialized: false
	})
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var journalSchema = new mongoose.Schema({
	id: Number,
	title: String,
	subtitle: String,
	dateAndTime: String,
	image: String,
	alt: String,
	body: String
});

var Journal = mongoose.model('Journal', journalSchema);

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

app.get('/secret', function(req, res) {
	res.render('secret');
});

app.post('/secret', function(req, res) {
	var Id = req.body.id;
	var Title = req.body.heading;
	var Subtitle = req.body.subheading;
	var dateAndTime = req.body.dateandtime;
	var image = req.body.image;
	var alt = req.body.alttext;
	var body = req.body.body;
	Journal.create(
		{
			id: Id,
			title: Title,
			subtitle: Subtitle,
			dateAndTime: dateAndTime,
			image: image,
			alt: alt,
			body: body
		},
		function(err, data) {
			if (err) {
				console.log('Error occured');
				console.log(err);
			} else {
				console.log('Data sucessfully entered.');
			}
		}
	);

	res.render('submit');
});

app.get('/register', function(req, res) {
	res.render('register');
});

app.post('/register', function(req, res) {
	User.register(new User({ username: req.body.username }), req.body.password, function(err, user) {
		if (err) {
			console.log(err);
			return res.render('register');
		}
		passport.authenticate('local')(req, res, function() {
			res.redirect('/secret');
		});
	});
});

app.get('/login', function(req, res) {
	res.render('login');
});

app.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/secret',
		failureRedirect: '/login'
	})
);

app.get('/:id/:title', function(req, res) {
	var ArticleId = req.params.id;
	var ArticleTitle = req.params.title;
	var ArticleUrl = '/' + ArticleId + '/' + ArticleTitle;
	Journal.find({ id: ArticleId }, function(err, data) {
		if (err) {
			console.log('Error has occured. ');
		} else {
			res.render('Article', {
				data: data,
				ArticleUrl: ArticleUrl
			});
		}
	});
});

app.get('*', function(req, res) {
	res.render('pageDoesNotExist');
});

app.listen(443, function() {
	console.log('Server Initiated');
});

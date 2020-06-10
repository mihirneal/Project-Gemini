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

app.get('/journal', function(req, res) {
	res.render('journal');
});

app.get(
	'/5367566B5970337336763979244226452948404D6351665468576D5A7134743777217A25432A462D4A614E645267556B586E3272357538782F413F4428472B4B',
	function(req, res) {
		res.render('secret');
	}
);

app.post(
	'/5367566B5970337336763979244226452948404D6351665468576D5A7134743777217A25432A462D4A614E645267556B586E3272357538782F413F4428472B4B',
	function(req, res) {
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
	}
);

app.get('/login', function(req, res) {
	res.render('login');
});

app.post(
	'/login',
	passport.authenticate('local', {
		successRedirect:
			'/5367566B5970337336763979244226452948404D6351665468576D5A7134743777217A25432A462D4A614E645267556B586E3272357538782F413F4428472B4B',
		failureRedirect: '/login'
	})
);

app.get('/journal/:id/:title', function(req, res) {
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

app.listen(5000, function() {
	console.log('Server Initiated');
});

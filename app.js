var express = require('express');
var mongoose = require('mongoose');
var app = express();

mongoose.connect('mongodb://localhost/journal1', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

app.set('view engine', 'ejs');
app.use(express.static('public'));

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

// var article = new Journal({
// 	id: 1,
// 	title: 'New NASA advisory committee to explore enhanced commercial activities',
// 	subtitle:
// 		'NASA Administrator Jim Bridenstine briefs the NASA Advisory Council on his plans to establish a new committee to study regulatory and policy issues Aug. 29. Credit: NASA TV',
// 	dateAndTime: 'August 30, 2018 at 2:21 p.m. CST',
// 	image: 'header image 1.jpg',
// 	alt: 'Jim Image NASA',
// 	body:
// 		'<p>WASHINGTON — NASA has tasked a new advisory committee with studying greater commercial activities at the agency, including selling naming rights for NASA missions and allowing astronauts to perform commercial work.</p> <p>In a presentation at an Aug. 29 meeting of the NASA Advisory Council at the Ames Research Center in California, NASA Administrator Jim Bridenstine announced the formation of a new committee within the council that will examine regulatory and policy issues.</p> <p>Bridenstine named as chairman of the committee Mike Gold, vice president of regulatory issues at Maxar Technologies. Gold is also chairman of the Commercial Space Transportation Advisory Committee (COMSTAC), an advisory group for the Federal Aviation Administration’s Office of Commercial Space Transportatio</p> <p>“NASA is famous for overcoming herculean technological challenges,” Gold said at the council meeting. “However, in this new era of public-private partnerships and commercial space development, conquering regulatory and policy hurdles can be just as important to the agency as any engineering challenge that NASA may face.”</p> <p>The committee, he said, will work to “target and tackle barriers” to achieving the agency’s goals on a wide range of issues related to commercialization. One area of focus will be commercial activities on the International Space Station, from allowing NASA astronauts to perform commercial work there to issues associated with adding private-sector modules to the station.</p> <p>“The great challenge private sector companies face is finding ways to bolster true commercial demand for human spaceflight” in low Earth orbit, Gold said. The ISS can play a “vital role” in that effort, he added, “but for this to occur, obsolete rules and regulations must be reviewed and revised.”</p> <p>Both Gold and Bridenstine, though, showed openness to greater commercial activities by NASA itself. That includes studying the ability for NASA astronauts to accept “endorsements and other media opportunities” as a way of both promoting themselves and the agency.</p> <p>Bridenstine noted that commercial crew vehicles will be flying private astronauts who will not have restrictions on their commercial activities. “If those astronauts are not limited in the way they are able to promote themselves, then should NASA astronauts be limited in how we promote NASA?” he said.</p> <p>He also said he wanted to make NASA astronauts as popular among the general public as professional athletes so that more young people will aspire to careers at the agency. “I’d like to see, maybe one day, NASA astronauts on the cover of a cereal box, embedded into the American culture,” he said</p> <p>A related issue Gold said his committee will address is potential commercial sponsorships of NASA spacecraft and launches. “Such branding will enhance the exposure of space activities in the popular culture, and will begin to validate a business case that future private sector operation will need to leverage,” he said.</p> <p>“Is it possible for NASA to offset some of its costs by selling the naming rights to its spacecraft or the naming rights to its rockets?” Bridenstine said. “There is interest in that right now. The question is, is it possible?”</p> <p>Selling of naming rights, he said later in the meeting, would provide more than funding for NASA. “Those private companies can then embed in their marketing campaigns NASA,” he said. “We can embed NASA into the culture and the fabric of American society and inspire generations of folks that will create those next capabilities to keep America preeminent.”</p> <p>Some of those activities, Bridenstine acknowledged, may be controversial, and require changes either in agency regulations or in federal law. “You hit a lot of things in there that could be perceived as provocative,” he said after Gold outlined those and other topics, such as export control reform and application of planetary protection policies for commercial missions, that the committee plans to address. “I want to be clear that we have not made any determinations nor have we prejudged the outcome of the committee.”</p> <p>The other members of Gold’s committee have not been announced yet, although Gold said its members would provide “expert, independent and creative advice” to the agency. “I believe in this. I’ve worked my entire life on these commercial activities,” he said. “It will happen. The question is whether it will happen in America. This committee will be committed to developing policies that make it easy, that will facilitate it happening here.</p>'
// });

// article.save(function(err, journal) {
// 	if (err) {
// 		console.log('Error saving the data.');
// 		console.log(err);
// 	} else {
// 		console.log('Data has been saved.');
// 	}
// });

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

app.get('/:id/:title', function(req, res) {
	Journal.find({ id: 1 }, function(err, data) {
		if (err) {
			console.log('Error has occured. ');
		} else {
			res.render('Article', { data: data });
		}
	});
});

app.get('*', function(req, res) {
	res.render('pageDoesNotExist');
});

app.listen(80, function() {
	console.log('Server Initiated');
});

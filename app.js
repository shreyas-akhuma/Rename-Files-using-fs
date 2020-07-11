const express = require('express'),
	  multer = require('multer'),
	  path = require('path'),
	  bodyParser = require('body-parser'),
	  fs = require('fs');

const uploadFolder = './public/uploads/study';

// Set The Storage Engine
const storageStudy = multer.diskStorage({
	destination : function (req, file, callback) {
		callback(null, uploadFolder);
	},
	filename : function (req, file, callback) {
		callback(null, file.fieldname +  Date.now() + path.extname(file.originalname));
	}
});

// Init Upload
const uploadStudy = multer({
	storage : storageStudy
}).single('file');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
	res.render('study');
});

app.post('/study', function(req, res){
	uploadStudy(req, res, function (err) {
		fs.renameSync(req.file.path, uploadFolder + '/'+ req.body.course + Date.now() + path.extname(req.file.filename));
	});
	console.log(req.body, req.file);
	res.redirect("/");
});
	
app.listen(3000, process.env.IP, function(){
	console.log("Server Started");
});

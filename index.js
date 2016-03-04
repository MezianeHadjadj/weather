

var express = require('express')
, app = express()
, bodyParser = require('body-parser')
, path=require("path")
, morgan = require('morgan')
, methodOverride = require('method-override')
//var Parse=require ("parse");



// configuration ===============================================================
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());


var swig = require('swig');
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
// dossier des vues
//var d=require('./spec/spec/YourSpec.js');
app.set('views', path.join(__dirname, '/spec'));

app.use('/', express.static(__dirname));

app.get('/', function(req, res) {
    res.render('tests.html');
});

app.use(function (err, req, res, next) {
    console.error(err);
    console.error(err.stack);
    next(err);
});


app.use(function(req, res) {
    res.send(404)
});
// START THE SERVER
// =============================================================================
var port = process.env.PORT || 1337;
app.listen(port, function() {
    console.log('Notepad app running on port ' + port + '.');
});

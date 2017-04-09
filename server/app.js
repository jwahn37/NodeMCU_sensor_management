//connect to mysql
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'vhrqkf!73',
    database: 'sensors'
})
connection.connect();
var fs=require('fs'); 

//activate express
var express = require('express')
  , http = require('http')
  , app = express()
  , server = http.createServer(app);

app.get('/', function (req, res) {
  res.send('20121604 temperature data information');
});

//convet time stamp function
function getTimeStamp() {
  var d = new Date();
  var s =
    leadingZeros(d.getFullYear(), 4) + '-' +
    leadingZeros(d.getMonth() + 1, 2) + '-' +
    leadingZeros(d.getDate(), 2) + ' ' +

    leadingZeros(d.getHours(), 2) + ':' +
    leadingZeros(d.getMinutes(), 2) + ':' +
    leadingZeros(d.getSeconds(), 2);

  return s;
}

function leadingZeros(n, digits) {
  var zero = '';
  n = n.toString();

  if (n.length < digits) {
    for (i = 0; i < digits - n.length; i++)
      zero += '0';
  }
  return zero + n;
}
////
//get data from nodemcu
app.get('/data', function (req, res) {
	
	//get query from nodemcu
	var curTemp = req.query.temperature;
	//insert to mysql 
	var query = connection.query("insert into sensor (temperature) values (?)",parseFloat(curTemp), function(err, rows, cols) {
  	if (err) {
  		console.log("done");
	  	process.exit();
	}
	});

	

	//output to local file
	var curTime = getTimeStamp();
	var data = "Last time : "+curTime+" , temperature :  "+curTemp+"\n"; 
	fs.appendFile('temperature.txt', data, 'utf8', function(error) {  });
	console.log(data);
});

//print table information to web browser
app.get("/dump", function(req, res) {
  console.log("param=" + req.query);

  var qstr = 'select * from sensor where last_time > date_sub(now(), INTERVAL 1 DAY) ';


	connection.query(qstr, function(err, rows, cols) {
    if (err) {
      throw err;
      res.send('query error: '+ qstr);
      return;
    }
//	res.json(rows);

    console.log("Got "+ rows.length +" records");
    var html = "<!doctype html><html><body>";
    html += "<H1> Sensor Data for Last 24 Hours</H1>";
    html += "<table border=1 cellpadding=3 cellspacing=0>";
    html += "<tr><td>Seq#<td>Time Stamp<td>Temperature";
    for (var i=0; i< rows.length; i++) {
      html += "<tr><td>"+rows[i].id+"#<td>"+rows[i].last_time+"<td>"+rows[i].temperature;
//      	html+="hi";
	 }
    html += "</table>";
    html += "</body></html>";
    res.send(html);

  });

});



///////
//server listen
server.listen(8000, function() {
  console.log('Express server listening on port ' + server.address().port);

});

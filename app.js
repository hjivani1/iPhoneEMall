var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var formidable = require("formidable");
var fs = require("fs");

var indexRouter = require('./routes/index');
var managerRouter = require('./routes/manager');
var manageUserRouter = require('./routes/manageUser');
var manageProductRouter = require('./routes/manageProduct');
var transactionRouter = require('./routes/manageTransaction');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var cartRouter = require('./routes/cartctrl');


var mongoose = require('mongoose');
// connect to MongoDB
mongoose.connect('mongodb://localhost/e-commereceMall', {useNewUrlParser:true, useUnifiedTopology:true}).then(() =>  console.log('connection succesful')).catch((err) => console.error(err));


var app = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/ManagerAccount', managerRouter);
app.use('/ManageUser', manageUserRouter);
app.use('/ManageProduct', manageProductRouter);
app.use('/ManageTransaction', transactionRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/cartctrl', cartRouter);
app.use('/userctrl', require('./routes/userctrl'));

app.post('/uploadGraph', function (req, res) {
    var form = new formidable.IncomingForm();
    console.log("about to parse");
    form.parse(req, function(error, fields, files) {
        console.log("parsing done");
        console.log(files.upload.path);
        fs.writeFileSync("public/images/"+files.upload.name, fs.readFileSync(files.upload.path));
    });
});

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

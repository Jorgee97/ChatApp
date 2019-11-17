var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var redis = require('redis');
var session = require('express-session')
var RedisStore = require("connect-redis")(session)
var client = redis.createClient();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server)

var mongoose = require('mongoose');

const MONGO_URL = require(__dirname + '/config.json')["connectionString"]["mongodb"] || process.env.MONGO_URL;
mongoose.connect(MONGO_URL,  {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var sessionMiddleware = session({
  store: new RedisStore({
    host: 'localhost' || process.env.REDIS_HOST,
    port: 6479,
    client: client,
    ttl: 260
  }),
  secret: 'this is a dev secret' || process.env.SECRET,
  resave: false,
  saveUninitialized: false  
});

io.use((socket, next) => {
  sessionMiddleware(socket.request, socket.request.res, next);
});

app.use(sessionMiddleware);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports =  {  app, server, io };

const express = require('express');
const bodyParser = require('body-parser');
const mcache = require('memory-cache');

const DataAccessObject = require('./dataAccessObject');
const Comment = require('./comment');
let getCommentsCacheKey = '';
let cachedResult = {};

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next()
});

const dataAccessObject = new DataAccessObject('./database.sqlite3');
const comment = new Comment(dataAccessObject);

comment.createTable().catch(error => {
  console.log(`Error: ${JSON.stringify(error)}`);
});

app.post('/createComment', function(request, response) {
  const { body } = request;
  comment.createComment(body).then(result => {
    mcache.clear(getCommentsCacheKey);
    response.send(result);
  });
});

app.get('/getComment', function(request, response) {
  const { body } = request;
  const { id } = body;
  comment.getComment(id).then(result => {
    response.send(result);
  });
});

app.get('/getComments', function(request, response) {
  getCommentsCacheKey = '__express__' + request.originalUrl || request.url;
  cachedResult = mcache.get(getCommentsCacheKey);

  if (cachedResult) {
    response.send(cachedResult);
  }
  else {
    comment.getComments().then(result => {
      mcache.put(getCommentsCacheKey, result, 5000*5000);
      response.send(result);
    });
  }
});

app.delete('/deleteComments', function(request, response) {
  comment.deleteComments().then(result => {
    mcache.clear(getCommentsCacheKey);
    response.send(result);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  const rootDir = __dirname.replace('/server', '');
  response.sendFile(`${rootDir}/src/index.html`);
});

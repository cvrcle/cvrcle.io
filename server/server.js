const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;

const cvrcleCtlr = require('./controllers/cvrcleControllers');
const cvrcleRouter = require('./routers/cvrcleRoutes');

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('client'));

app.use('/', cvrcleRouter);

app.listen(port, function () {
  console.log('Server listening on ', port);
});

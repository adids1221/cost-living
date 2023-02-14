/*Developers Details:
* Adi Mordo - 313531634
* Stav Gallula - 205969868
*/

const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');
const connectDB = require('./config/mongoose');
const createError = require('http-errors');
const logger = require('morgan');

const costRouter = require('./routes/cost');
const reportRouter = require('./routes/report');
const aboutRouter = require('./routes/about');

const app = express();

dotenv.config({ path: './.env' });
connectDB();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(express.static('public'));
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(express.static(path.join(__dirname, 'public')));


//Routes
app.use('/addcost', costRouter);
app.use('/report', reportRouter);
app.use('/about', aboutRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500).json({ message: 'error' });
});

module.exports = app;


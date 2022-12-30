const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');
const connectDB = require('./config/mongoose');

const app = express();

dotenv.config({ path: './.env' });
connectDB();

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(express.static('public'));
app.use(express.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

//Static folder
const PORT = process.env.PORT || 8080;

//Routes
app.use('/', require('./routes/cost'));
app.use('/report', require('./routes//report'));

app.listen(PORT, () => {
    console.log('Server is up and running on http://localhost:' + PORT);
});

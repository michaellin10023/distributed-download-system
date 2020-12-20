const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const db = require('./config/sequelize');


// DB
db.authenticate()
    .then(() => console.log('database connected...'))
    .catch(err => console.log('error: ' + err))


// middleware
app.use(cors());
app.use(express.json());

app.use('/download', require('./routes/download'));
app.use('/retrieve ', require('./routes/retrieve'));


app.listen(3000, () => {
    console.log("server has started on port 3000....")
});
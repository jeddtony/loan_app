const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

if(process.env.ENV === 'Test'){
    console.log('This is a test');
    const db = mongoose.connect('mongodb://localhost/laonappdb_Test');
  }else{
    console.log('This is for real')
    // const db = mongoose.connect('mongodb://localhost/loanappdb');
    const db = mongoose.connect('mongodb://localhost/loanappdb');
  }

const Loan = require('./models/loan');
const loanRouter = require('./routes/loanRoute')(Loan);
// const loanRouter = require('./routes/loanRoute');

// loanRouter(app);

app.use('/api', loanRouter);

app.get('/', (req, res) => {
    res.send('Welcome to my Node API');
})
const port = process.env.PORT || 3000;

app.server = app.listen(port, () => {
    console.log(`running on port ${port}`);
});

module.exports = app;
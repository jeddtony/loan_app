const express = require('express');
const mongoose = require('mongoose');

const app = express();


const port = process.env.PORT || 3000;

app.server = app.listen(port, () => {
    console.log(`running on port ${port}`);
});
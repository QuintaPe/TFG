const express = require("express");
const morgan = require("morgan");

require('./database');

// Initializations
const app = express();


// Settings
app.set("port", process.env.PORT || 4000);


// Middlewares
app.use(morgan("dev"));
app.use(express.json());


// Routes
app.use('/api', require('./routes/index'));


// Static files



module.exports = app;

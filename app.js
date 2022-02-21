const express = require('express');
var todoController = require('./controllers/todoController');
const app = express();

const ejs = require('ejs');
app.set('view engine', ejs);

//static files.
app.use(express.static('./public'));

//fire controller
todoController(app);

const port = process.env.PORT || 8080
app.listen(port,()=>console.log(`The server is running on port ${port}`))
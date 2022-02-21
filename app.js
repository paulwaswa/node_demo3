const express = require('express');
const app = express();
const ejs = require('ejs');
app.set('view engine', ejs);
app.get('/',(req,res)=>{
res.render('home.ejs');
});
const port = process.env.PORT || 8080
app.listen(port,()=>console.log(`The server is running on port ${port}`))
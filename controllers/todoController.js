const bodyParser = require('body-parser');
var mongoose = require('mongoose');

//var data = [{item: 'taking breakfast'},{item:'Coding'},{item: 'going to shop'}]

//conect to mogodb 
//mongodb+srv://paul-w:8491@todo.9xh2e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://paul-w:8491@todo.9xh2e.mongodb.net/note-tuts?retryWrites=true&w=majority')
//.then((result)=>app.listen(3000))
.then((result)=>console.log('connected to db'))
.catch((err)=>console.log(err));

// create a schemma - like a blue print for our data. i.e. communicate to monogoDB tell it how our data will look like.

var todoSchema = new mongoose.Schema({item: String},{timestamps: true});
var Todo = mongoose.model('Todo',todoSchema);

/*
var itemOne = Todo({item: 'buy flowers'}).save()
.then((result)=>{
    console.log(result);
})
.catch(
function (err){
    if(err)
    throw err;
});
*/

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){
    
    app.get('/',(req,res)=>{
        res.render('home.ejs');
        });

app.get('/todo',function(req,res){
    // get data from MongoDB and pass it to the view 
    Todo.find({},function(err,data){
        if(err)
        throw err;

        res.render('todo.ejs',{todos: data});
    });
 
});

app.post('/todo', urlencodedParser,function(req,res){
    // get data from the view and add it to the dataBase.
    var newTodo = Todo(req.body).save(function(err,data){
        if(err)
        throw err;
        res.json(data);

    });
//data.push(req.body);
//res.json(data);
});
app.delete('/todo/:item',function(req,res){
// delete the requested item from monogoDB
//Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err,data){
    Todo.find({item: req.params.item.replace(/\-/g," ")}).deleteOne(function(err,data){
    if(err)
    throw err;
    res.json(data);
})
/*
 data = data.filter(function(todo){
     return todo.item.replace(/ /g,'-') !==req.params.item ;
 });
 res.json(data);
*/
});

};
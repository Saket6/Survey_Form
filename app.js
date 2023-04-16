const express=require('express');
const app=express();
// const fs=require("fs");
const port=80;
const path=require("path");
const mongoose = require('mongoose');
var bodyParser = require('body-parser');


//mongoose stuff

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/survey-form');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//body parser
app.use(bodyParser.urlencoded({
    extended: false
 }));
 
 app.use(bodyParser.json());



//schema

const details = new mongoose.Schema({
    name: String,
    Email: String,
    Age: Number,
    role: String,
    Recommendation: String,
    improvement1: String,
    improvement2: String,
    improvement3: String,
    Comments: String
  });

  const Details = mongoose.model('Details', details);



app.use(express.static(path.join(__dirname, '/')));
app.get('/', function(req, res)
{
    res.status(200).render('index.html');
})


app.post('/details', function(req, res)
{
    var details=new Details(req.body);
    details.save().then(
    ()=>
        {
        res.send("Your form has been submitted successfully");
        }
    ).catch(()=>
    {
        res.send("Sorry try Again");
    });
    
    
})


app.listen(port, function()
    {
        console.log('listening on port 80');
    })
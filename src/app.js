const express =  require('express');
const app  = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require('dotenv').config();

app.use(bodyParser.urlencoded({extended:true}));
process.env.mongoURI;

const path = require("path");
const hbs = require("hbs");
const { registerPartials} = require("hbs");
const port = process.env.PORT || 5000;

//require("./db/conn");
//const User = require("./models/usermessage")


const staticpath = path.join(__dirname, 'public');
//middleware
//app.use(express.urlencoded({extended:false}))
hbs.registerPartials("templates\partials");
app.use(express.static(staticpath))
app.set("view engine","hbs");
app.set('views',"templates\views");

//app.get(path,callback)
app.get('/', (req,res) =>{
    res.render("../templates/views/index.hbs");
})


////////Updated Database link
const notesSchema = {
    name:String,
    emailid:String,
    phone:Number,
    message:String
}

const Note = mongoose.model("Note",notesSchema);
app.get("/",function(req,res){
   //sonst test res.sendFile(__dirname + "/index.html")
   res.sendFile(__dirname + "/templates/views/index.hbs");

})
//app.post
app.post("/",function(req,res){
    let newNote = new Note({
        name:req.body.name,
        emailid:req.body.emailid,
        phone:req.body.phone,
        message:req.body.message
    });
    newNote.save();
    res.redirect("/");
})

app.listen(port,()=>{
    console.log(`server is running a port ${port}`);
})


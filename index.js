const express=require("express")
const body=require("body-parser")
const app=express()
app.set('view engine','ejs');
app.use(body.urlencoded({extended:true}))
app.use(express.static("public"))
const mongoose = require("mongoose")


mongoose.connect("mongodb+srv:jeevanvjijo07:test123@cluster0.ufqvttc.mongodb.net/tododb",{useNewUrlParser:true})

app.use(express.static("public"))
//Schema
const todoSchema=new mongoose.Schema({task:String})
//model
const todomodel=mongoose.model("tasks",todoSchema) 


// const t1= new todomodel({task:"playing"})
// const t2= new todomodel({task:"gaming"})
// const t3= new todomodel({task:"studying"})
// const t4= new todomodel({task:"reading"})
// t1.save()
// t2.save()
// t3.save()
// t4.save()
app.get("/",function(req,res){
    todomodel.find().then((result)=>{
        res.render("index",{tasks:result})
    }).catch((err) => {
        console.log(err)
    });
    
})

app.post("/",function(req,res){
    var todotask=req.body.task
    // console.log(task)
    // lists.push(task)
    const task = new todomodel({task:todotask})
    task.save()

    res.redirect("/")
})

app.post("/delete",function(req,res){
    var item=req.body.checkbox
    todomodel.deleteOne({_id:item}).then((result) => {
        res.redirect("/")
    }).catch((err)=>{
        console.log(err)
    });
})
app.listen(process.env.PORT||4000,function(){
    console.log("server is running")
})

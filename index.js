const{ MongoClient,ServerApiVersion }= require('mongodb');
const url="mongodb+srv://yogeshwar:Yogeshwar07@cluster0.6o6ig6o.mongodb.net/?retryWrites=true&w=majority";
const user =new MongoClient(url,{useNewUrlParser:true,useUnifiedTopology:true,serverApi:ServerApiVersion.v1});
user.connect().then(()=>{console.log("db is connected");})

const db=user.db("graspear");
const cors =require("cors")
const express=require("express")
var http = require("http");
// const { response } = require('express');
// const { prependOnceListener } = require('process');
const app=express()
const port =8000;

app.use(cors({origin:'*'}))

var server=http.createServer(app);
app.use(express.json())

server.listen(port,"0.0.0.0",()=>{
    console.log("Begun")
})

app.get("/",(request,response)=>{response.send(
    "Welcome to ebay site to view products visit <a href='http://localhost:8000/usecase3'>click here</a>");
})

app.get("/ebbaay",async(request,response)=>{
    const collection=db.collection('usecase3');
    const result=await collection.find();
    const pod=[];
    await result.forEach((val)=>{
        pod.push(val)
    });
    response.send(pod)          
})

app.post("/usecase3",(request,response)=>{
    const collection=db.collection('usecase3');
    collection.insertOne(request.body).then(()=>{response.send("Inserted")})
})  

app.put("/usecase3/:id",(request,response)=>{
    const collection=db.collection('usecase3');
    collection.updateOne({'product_id':request.params.id},
    {$set:request.body}).then(()=>{response.send("updated successfully")})
})

app.delete("/usecase3/:id",(request,response)=>{
    const collection=db.collection('usecase3');
    collection.deleteOne({'product_id':request.params.id}).then(()=>{
        response.send("Deleted");})
})
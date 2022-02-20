//imports
const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const zomatoRoutes=require('./routes/zomato')
const paymentRoutes=require('./routes/razorPay')
const mongoose=require('mongoose')
require("dotenv").config();
//connect to mongoDB 
/* mongoose.connect('mongodb://localhost/zomato',
     ()=>{
    console.log("mongoDB connected")},
    e=>console.log(e)) */


//create express server
var app=express()
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });
//add middleware before routes
app.use(bodyParser.json())
/* app.use(cors()) */

//middleware routes 
app.use('/zomato',zomatoRoutes)
app.use('/pay',paymentRoutes) 

//listen to a port 
/* app.listen(7878,()=>{
    console.log("express app is up and running on port 7878")
}) */
mongoose.connect("mongodb+srv://shamsiya:abcd@cluster0.rnjb0.mongodb.net/zomato?retryWrites=true&w=majority",
{ useNewUrlParser: true, useUnifiedTopology: true })
.then(res=>{
    console.log('connected');
    app.listen(process.env.PORT || 7878, () => {
        console.log("server running at port 7878")
    });
}).catch(err=>{
    console.log(err);
})

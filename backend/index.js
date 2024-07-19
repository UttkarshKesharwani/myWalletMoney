require('dotenv').config();
const cors = require('cors')
const express = require("express");
const mainRouter = require('./Routes');
const connectionToDB = require('./Utils/db');
const app = express();
const port =  3000 ;


app.use(cors())
app.use(express.json());


app.get("/hello",function(req,res){
  res.send("klheljjdf")
})
app.use("/api/v1",mainRouter)






app.listen(port , ()=>{
  console.log(`port is running on ${port}`);
  connectionToDB();
})
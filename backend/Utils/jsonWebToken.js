require("dotenv").config();
const jwt = require('jsonwebtoken');
const secretToken = process.env.SECRETJWTTOKEN;


const generateToken = (id)=>{
  const token = jwt.sign({id},secretToken,{expiresIn:'30d'})
  return token;
}


module.exports =  {generateToken} 


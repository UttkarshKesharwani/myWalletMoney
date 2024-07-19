
const mongoose = require('mongoose');
require('dotenv').config()

const database = process.env.DATABASE
const dbPassword = process.env.DATABASE_PASSWORD
const dbConnection = database.replace("<password>",dbPassword)

const connectionToDB = async ()=>{
  try {
    await mongoose.connect(dbConnection);
    console.log("Database connected Successfully");
  } catch(error) {
    console.log("Error while connecting to DataBase",error.message);
  }
}

module.exports = connectionToDB
const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

/**
 * @type {mongoose.SchemaDefinitionProperty}
 */

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    // minlength: 5,
    // maxlength: 10,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 10,
    select:false
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
});




userSchema.pre('save',async function(next){

  console.log("before saving the user",this)
  
  if(!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password,10);
  
  next()
})

userSchema.methods.correctPassword = async function(candidatePassword,userPassword){
  console.log("from 54",this)
  return await bcrypt.compare(candidatePassword,userPassword)
}








const User = mongoose.model("User",userSchema);





module.exports = User

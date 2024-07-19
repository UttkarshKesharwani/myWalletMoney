


const mongoose = require ('mongoose');




/**
 * @type {mongoose.SchemaDefinitionProperty}
*/



const accountSchema = mongoose.Schema({
  userId:{
    type : mongoose.Types.ObjectId,
    ref:'User',
    required:true
  },
  balance : {
    type:Number,
    required:true
  }
})


const Account = mongoose.model("Account",accountSchema);




module.exports = Account
const express = require('express');
const { signUp ,signIn,protect,queryUsers} = require('../Controller/userController');
const userRouter = express.Router();


userRouter.post("/signup",signUp)
userRouter.post("/signin",signIn)
userRouter.get("/bulk",queryUsers)
// userRouter.get("/")
// userRouter.post("/checking",protect)


module.exports = userRouter 
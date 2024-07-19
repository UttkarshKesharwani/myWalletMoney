const express = require('express');
const { getBalance ,transferMoney} = require('../Controller/accountController');
const { protect } = require('../Controller/userController');
const accountRouter = express.Router();


 
accountRouter.get("/balance",protect,getBalance)
accountRouter.post("/transfer",protect,transferMoney)




module.exports = accountRouter;
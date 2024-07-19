const mongoose = require("mongoose");
const Account = require("../Model/balanceModel");

const getBalance = async (req, res) => {
  try {
    // console.log( req.user);

    const user = await Account.findOne({
      userId: req.user, 
    });

    return res.status(200).json({
      status: "success",
      balance: user.balance,
    });
    
  } catch (error) {
    return res.status(404).json({
      status: "fail",
      error: error.message,
    });
  }
};

const transferMoney = async (req, res) => { 
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { to, amount } = req.body;

    const account = await Account.findOne({
      userId: req.user,
    }).session(session);
    if (!account) { 
      session.abortTransaction()
      return res.status(404).json({
        status: "fail",
        message: "User not exist",
      });
    }
    if (account.balance < amount && account.balance > 0) {
      session.abortTransaction()
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    const toAccount = await Account.findOne({
      userId: to,
    }).session(session);
    if (!toAccount) {
      session.abortTransaction()
      return res.status(404).josn({
        status: "fail",
        message: "User not exist",
      });
    }

    // console.log(account, toAccount);

    await Account.updateOne(
      {
        userId: req.user,
      },
      {
        $inc: {
          balance: -amount,
        },
      }
    ).session(session);

    await Account.updateOne(
      {
        userId: to,
      },
      {
        $inc: {
          balance: amount,
        },
      }
    ).session(session);

    session.commitTransaction();
    return res.status(200).json({ 
      msg: "Transfer successfull",
    });
  } catch (error) {
    session.abortTransaction();
    return res.send(error.message);
  }
};

module.exports = {
  getBalance,
  transferMoney,
};

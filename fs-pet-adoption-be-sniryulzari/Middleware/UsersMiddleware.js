const { getUserByEmailModel } = require("../Models/usersModel");
const bcrypt = require("bcrypt");

function passwordMatch(req, res, next) {
  if (req.body.password === req.body.repassword) {
    next();
    return;
  }
  res.status(400).send("password dont match");
}

async function isNewUser(req, res, next) {
  const user = await getUserByEmailModel(req.body.email);
  if (user) {
    res.status(400).send("user already exists");
    return;
  }
  next();
}

function hashPassword(req, res, next) {
  const saltRounds = 10;
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    req.body.password = hash;
    next();
  });
}

async function isExistingUser(req, res, next) {
  const user = await getUserByEmailModel(req.body.email);
  if (user) {
    req.body.user = user;
    next();
    return;
  }
    res.status(400).send("User with this email does not exists");
};

async function verifyPassword(req, res, next) {
  const {user} = req.body;

  bcrypt.compare(req.body.password, user.password, (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    if (result) {
      next();
      return;
    } else {
      res.status(400).send("Incorrrect Password!");
    }
  });
};



module.exports = { passwordMatch, isNewUser, hashPassword, isExistingUser, verifyPassword };

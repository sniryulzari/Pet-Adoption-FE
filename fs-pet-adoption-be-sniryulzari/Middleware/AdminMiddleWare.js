const User = require("../Schemas/userSchemas");

async function isAdmin(req, res, next) {
const userId = req.body.userId;
const userInfo = await User.findById({ _id: userId });
// console.log("userInfo:", userInfo.isAdmin)

  try {
    if (userInfo.isAdmin) {
      next();
    } else {
      res.status(403).send("Forbidden access");
      return;
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = { isAdmin };

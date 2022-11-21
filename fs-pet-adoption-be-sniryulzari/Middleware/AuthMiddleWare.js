const jwt = require("jsonwebtoken");

async function Auth(req, res, next) {
  const { token } = req.cookies;
  // console.log("token auth:",token);
  if (!token) {
    res.status(401).send("Token Required");
    return;
  }
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).send("Invalid Token");
      return;
    }
    if (decoded) {
      req.body.userId = decoded.id;

      next();
    }
  });
}

module.exports = { Auth };

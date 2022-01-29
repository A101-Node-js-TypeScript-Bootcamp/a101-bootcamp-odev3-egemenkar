const expressJwt = require("express-jwt");

const secret = "62csdfhsdhshsfgh";

function jwt() {
  
  return expressJwt({ secret, algorithms: ["HS256"] }).unless({
    path: ["/api/user/login", "/api/user/register"],
  });
}

module.exports = jwt;

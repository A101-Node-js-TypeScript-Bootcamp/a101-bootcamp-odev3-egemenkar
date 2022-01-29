module.exports = errorHandler;

function errorHandler(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ message: "Invalid token" });
  }
  return res.status(500).send({ message: err.message });
}

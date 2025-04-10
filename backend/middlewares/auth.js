const jwt = require("jsonwebtoken");
const authent = async (req, res, next) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    return res.status(403).json({
      message: "unathorize",
    });
  }
  try {
    const decoded = jwt.verify(auth, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(500).json({
      message: "unathorize",
      err,
    });
  }
};

module.exports = authent

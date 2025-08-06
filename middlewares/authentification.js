import jwt from "jsonwebtoken";

const authentification = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Access refuse" });
  }
  try {
    const decrypted = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decrypted._id;
    next();
  } catch (err) {
    console.error("Access refuse", err.message);
    res.status(401).json({ message: "Token invalid" });
  }
};

export default authentification;

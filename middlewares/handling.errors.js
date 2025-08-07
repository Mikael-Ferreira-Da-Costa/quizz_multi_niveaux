const errorHandler = (err, req, res, next) => {
  console.error("Error occured:", err.message);
  switch (err.name) {
    case "ArgumentRequired":
      return res.status(400).json({ message: "Missing Data required" });
    case "IncorrectData":
      return res.status(401).json({ message: "Incorrect Data" });
    case "UserNotFound":
      return res.status(404).json({ message: "User not found" });
    case "UserAlreadyExist":
      return res.status(409).json({ message: "User Already Exist" });
    default:
      return res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export default errorHandler;

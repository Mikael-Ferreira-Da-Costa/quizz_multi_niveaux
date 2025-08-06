import UserService from "./user.service.js";

class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async register(req, res, next) {
    const { username, email, password } = req.body;
    try {
      const newUser = await this.userService.register({
        username,
        email,
        password,
      });
      res
        .status(201)
        .json({ message: "User Create !", username: newUser.username });
    } catch (err) {
      console.log(err);

      next(err);
    }
  }

  async logInUser(req, res, next) {
    const { email, password } = req.body;
    try {
      const { token, user } = await this.userService.logInUser({
        email,
        password,
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.ENV === "production",
        sameSite: "strict",
        expires: new Date(Date.now() + 3600000),
      });
      res.status(200).json({ message: "Login success : ", user });
    } catch (err) {
      next(err);
    }
  }

  async authentificationUser(req, res) {
    res.status(200).json({ message: "Authentification successful" });
  }

  async logOutUser(req, res) {
    try {
      res.cookie("token", "", {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        expires: new Date(0),
      });
      res.status(200).json({ message: "Logout successful" });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async updateUser(req, res) {
    const id = req.body._id;
    const update = req.body;

    if (!id) {
      return res.status(400).json({ message: "User not found" });
    }
    if (!update) {
      return res.status(400).json({ message: "Nothing to update" });
    }

    const connectedId = req.userId;

    if (id !== connectedId) {
      return res.status(403).json({
        message: "The user does not have the rights to modify this profile",
      });
    }

    try {
      const updatedUser = await this.userService.updateUser(id, update);
      res
        .status(200)
        .json({ username: updatedUser.username, email: updatedUser.email });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default new UserController(UserService);

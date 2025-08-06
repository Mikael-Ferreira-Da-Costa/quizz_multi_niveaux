import express from "express";
import userController from "../users/user.controller.js";
import authentification from "../middlewares/authentification.js";
const router = express.Router();

router.post("/", (req, res, next) => userController.register(req, res, next));
router.post("/login", (req, res, next) =>
  userController.logInUser(req, res, next)
);
router.get("/profil", authentification, (req, res) =>
  userController.authentificationUser(req, res)
);
router.post("/logout", (req, res) => userController.logOutUser(req, res));
router.put("/", authentification, (req, res) => {
  userController.updateUser(req, res);
});

export default router;

import UserRepository from "./user.repository.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async findUserByEmail(email) {
    return await this.userRepository.findUserByEmail(email);
  }

  async register({ username, email, password }) {
    if (!username || !email || !password) {
      throw new Error("ArgumentRequired");
    }
    try {
      const user = await this.findUserByEmail(email);
      if (user) {
        throw new Error("UserAlreadyExist");
      }
      const hashPassword = await argon2.hash(password, {
        type: argon2.argon2id,
      });
      const newUser = this.userRepository.register({
        username,
        email,
        password: hashPassword,
      });
      return newUser;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async logInUser({ email, password }) {
    if (!email || !password) {
      throw new Error("ArgumentRequired");
    }
    try {
      const user = await this.findUserByEmail(email);
      if (!user) {
        throw new Error("IncorrectData");
      }
      const isPasswordValid = await argon2.verify(user.password, password);
      if (!isPasswordValid) {
        throw new Error("IncorrectData");
      }
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      return {
        token,
        user: { username: user.username, email: user.email },
      };
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }
  }

  async updateUser(id, update) {
    try {
      return await this.userRepository.updateUser(id, update);
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export default new UserService(UserRepository);

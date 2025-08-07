import UserRepository from "./user.repository.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import {
  ArgumentRequiredError,
  IncorrectDataError,
  UserNotFoundError,
  UserAlreadyExistError,
  UnexpectedError,
} from "../utils/customErrors.js";

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getUserById(id) {
    const user = await this.userRepository.getUserById(id);
    if (!user) {
      throw new UserNotFoundError();
    }
    return user;
  }

  async findUserByEmail(email) {
    return await this.userRepository.findUserByEmail(email);
  }

  async register({ username, email, password }) {
    if (!username || !email || !password) {
      throw new ArgumentRequiredError();
    }
    const user = await this.findUserByEmail(email);
    if (user) {
      throw new UserAlreadyExistError();
    }
    const hashPassword = await argon2.hash(password, {
      type: argon2.argon2id,
    });
    const newUser = await this.userRepository.register({
      username,
      email,
      password: hashPassword,
    });

    return newUser;
  }

  async logInUser({ email, password }) {
    if (!email || !password) {
      throw new ArgumentRequiredError();
    }
    const user = await this.findUserByEmail(email);
    if (!user) {
      throw new IncorrectDataError();
    }
    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      throw new IncorrectDataError();
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    return {
      token,
      user: { username: user.username, email: user.email },
    };
  }

  async updateUser(id, update) {
    return await this.userRepository.updateUser(id, update);
  }
}

export default new UserService(UserRepository);

import User from "./user.model.js";

class UserRepository {
  async findUserByEmail(email) {
    return User.findOne({ email: email });
  }

  async register({ username, email, password }) {
    try {
      const newUser = new User({ username, email, password });
      await newUser.save();
      return newUser;
    } catch (err) {
      console.error(err);
      throw new Error("Error creating user", err);
    }
  }

  async updateUser(id, update) {
    try {
      return await User.findByIdAndUpdate(id, { $set: update }, { new: true });
    } catch (err) {
      throw new Error("Error ", err);
    }
  }
}

export default new UserRepository();

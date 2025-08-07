import User from "./user.model.js";
import {
  userValidationSchema,
  userUpdateValidationSchema,
} from "./user.utils.js";

class UserRepository {
  async getUserById(id) {
    return await User.findById(id);
  }

  async findUserByEmail(email) {
    return User.findOne({ email: email });
  }

  async register({ username, email, password }) {
    const result = userValidationSchema.validate({ username, email, password });

    if (result.error) throw result.error;

    const newUser = new User({ username, email, password });
    await newUser.save();
    return newUser;
  }

  async updateUser(id, update) {
    const result = userUpdateValidationSchema.validate(update);

    if (result.error) throw result.error;
    return await User.findByIdAndUpdate(id, { $set: update }, { new: true });
  }
}

export default new UserRepository();

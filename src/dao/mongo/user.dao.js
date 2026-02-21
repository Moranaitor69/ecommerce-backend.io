import User from '../../models/user.model.js';

export default class UserDAO {

  getByEmail = async (email) => {
    return await User.findOne({ email });
  };

  getById = async (id) => {
    return await User.findById(id);
  };

  create = async (userData) => {
    return await User.create(userData);
  };

  update = async (id, data) => {
    return await User.findByIdAndUpdate(id, data, { new: true });
  };

  updatePassword = async (id, newPassword) => {
    return await User.findByIdAndUpdate(
      id,
      { password: newPassword },
      { new: true }
    );
  };

  delete = async (id) => {
    return await User.findByIdAndDelete(id);
  };
}
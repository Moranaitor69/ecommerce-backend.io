import User from '../../models/user.model.js';

export default class UserDAO {
  getByEmail = email => User.findOne({ email });
}

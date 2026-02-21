export default class UsersRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getByEmail = async (email) => {
    return await this.dao.getByEmail(email);
  };

  getById = async (id) => {
    return await this.dao.getById(id);
  };

  create = async (userData) => {
    return await this.dao.create(userData);
  };

  updatePassword = async (id, newPassword) => {
    return await this.dao.updatePassword(id, newPassword);
  };
}
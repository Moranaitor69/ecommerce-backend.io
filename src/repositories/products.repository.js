export default class ProductsRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getAll = async () => {
    return await this.dao.getAll();
  };

  getById = async (id) => {
    return await this.dao.getById(id);
  };

  create = async (productData) => {
    return await this.dao.create(productData);
  };

  update = async (id, productData) => {
    return await this.dao.update(id, productData);
  };

  delete = async (id) => {
    return await this.dao.delete(id);
  };
}
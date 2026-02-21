import bcrypt from 'bcrypt';
import UsersRepository from '../repositories/users.repository.js';
import UserDAO from '../dao/mongo/user.dao.js';

const usersRepository = new UsersRepository(new UserDAO());

export const registerUser = async (userData) => {

  const existingUser = await usersRepository.getByEmail(userData.email);

  if (existingUser) {
    throw new Error("Usuario ya existe");
  }

  userData.password = await bcrypt.hash(userData.password, 10);

  return await usersRepository.create(userData);
};

export const resetUserPassword = async (userId, newPassword) => {

  const user = await usersRepository.getById(userId);

  const isSame = await bcrypt.compare(newPassword, user.password);

  if (isSame) {
    throw new Error("No puedes usar la misma contraseña");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  return await usersRepository.updatePassword(userId, hashedPassword);
};
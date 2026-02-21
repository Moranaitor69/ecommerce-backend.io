import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../config/config.js';
import UserCurrentDTO from '../dto/UserCurrent.dto.js';
import UsersRepository from '../repositories/users.repository.js';
import UserDAO from '../dao/mongo/user.dao.js';

const usersRepository = new UsersRepository(new UserDAO());

/* ================= LOGIN ================= */

export const login = (req, res) => {
  const user = req.user;

  const token = jwt.sign(
    { id: user._id, role: user.role, email: user.email },
    config.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.cookie('jwt', token, {
    httpOnly: true,
    sameSite: 'strict',
    secure: false
  });

  res.json({
    status: 'success',
    message: 'Autorizado'
  });
};

/* ================= CURRENT ================= */

export const current = async (req, res) => {
  try {
    const userDTO = new UserCurrentDTO(req.user);

    res.json({
      status: 'success',
      user: userDTO
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ================= FORGOT PASSWORD ================= */

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await usersRepository.getByEmail(email);

    // Respuesta genérica por seguridad
    if (!user) {
      return res.json({
        status: 'success',
        message: 'Si el correo existe, se enviará un enlace de recuperación'
      });
    }

    const token = jwt.sign(
      { id: user._id },
      config.JWT_RESET_SECRET,
      { expiresIn: '1h' }
    );

    const resetLink = `http://localhost:${config.PORT}/api/sessions/reset-password?token=${token}`;

    // MODO DESARROLLO → MOSTRAR LINK EN CONSOLA
    console.log('\n🔐 ===============================');
    console.log('LINK DE RECUPERACIÓN GENERADO:');
    console.log(resetLink);
    console.log('=================================\n');

    res.json({
      status: 'success',
      message: 'Si el correo existe, se enviará un enlace de recuperación'
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ================= RESET PASSWORD ================= */

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({
        error: 'Token y nueva contraseña son requeridos'
      });
    }

    // Verificar token
    const decoded = jwt.verify(token, config.JWT_RESET_SECRET);

    const user = await usersRepository.getById(decoded.id);

    if (!user) {
      return res.status(404).json({
        error: 'Usuario no encontrado'
      });
    }

    // Verificar que no sea la misma contraseña
    const isSamePassword = await bcrypt.compare(
      newPassword,
      user.password
    );

    if (isSamePassword) {
      return res.status(400).json({
        error: 'No puedes usar la misma contraseña anterior'
      });
    }

   
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await usersRepository.updatePassword(
      user._id,
      hashedPassword
    );

    

    res.json({
      status: 'success',
      message: 'Contraseña actualizada correctamente'
    });

  } catch (error) {
    console.error(error);
    res.status(400).json({
      error: 'Token inválido o expirado'
    });
  }
};
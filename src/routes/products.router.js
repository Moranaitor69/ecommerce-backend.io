import { Router } from 'express';
import passport from 'passport';
import { authorizeRole } from '../middleware/authorization.middleware.js';

const router = Router();

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  authorizeRole('admin'),
  (req, res) => {
    res.json({
      status: 'success',
      message: 'Producto creado (admin)'
    });
  }
);


router.put(
  '/:pid',
  passport.authenticate('jwt', { session: false }),
  authorizeRole('admin'),
  (req, res) => {
    res.json({
      status: 'success',
      message: 'Producto actualizado (admin)'
    });
  }
);


router.delete(
  '/:pid',
  passport.authenticate('jwt', { session: false }),
  authorizeRole('admin'),
  (req, res) => {
    res.json({
      status: 'success',
      message: 'Producto eliminado (admin)'
    });
  }
);

export default router;
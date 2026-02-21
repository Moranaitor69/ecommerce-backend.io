import { Router } from 'express';
import sessionsRouter from './sessions.router.js';
import productsRouter from './products.router.js';

const router = Router();
router.use('/api/sessions', sessionsRouter);
router.use('/api/products', productsRouter);

export default router;

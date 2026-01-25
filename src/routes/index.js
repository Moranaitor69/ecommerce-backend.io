import { Router } from 'express';
import sessionsRouter from './sessions.router.js';

const router = Router();
router.use('/api/sessions', sessionsRouter);

export default router;

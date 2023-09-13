import {Router} from 'express';

import customersRoutes from '../customers.route';

const router = Router();

router.use(customersRoutes);

export default router;

import {Router} from 'express';

import {createCustomer} from '../controllers/customers/createCustomer/createCustomer.controller';
import {findCustomerById} from '../controllers/customers/findCustomerById/findCustomerById.constroller';
import {updateCustomer} from '../controllers/customers/updateController/updateCustomer.controller';
import {deleteCustomer} from '../controllers/customers/deleteCustomer/deleteCustomer.controller';

const router = Router();

router.post('/customers', createCustomer);

router.get('/customers/:id', findCustomerById);

router.put('/customers/:id', updateCustomer);

router.delete('/customers/:id', deleteCustomer);

export default router;

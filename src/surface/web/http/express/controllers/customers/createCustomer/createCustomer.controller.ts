import {Request, Response} from 'express';

import {CreateCustomerController} from '../../../../../../../infrastructure/controllers/customers/createCustomer/createCustomer.controller';

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const createCustomerController = new CreateCustomerController();

    const createCustomerOrError = await createCustomerController.createCustomerInPostgres({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age
    });

    if (createCustomerOrError.isLeft()) {
      return res.json({error: createCustomerOrError.value});
    }

    return res.json({data: createCustomerOrError.value});
  } catch (err) {
    return res.json({error: err});
  }
};

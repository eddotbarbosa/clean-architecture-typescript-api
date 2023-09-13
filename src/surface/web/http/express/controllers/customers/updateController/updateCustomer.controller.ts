import {Request, Response} from 'express';

import {UpdateCustomerController} from '../../../../../../../infrastructure/controllers/customers/updateCustomer/updateCustomer.controller';

export const updateCustomer = async function (req: Request, res: Response) {
  try {
    const updateCustomerController = new UpdateCustomerController();

    const updateCustomer = await updateCustomerController.updateCustomerInPostgres({
      where: {
        id: req.params.id
      },
      data: {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
      }
    });

    if (updateCustomer.isLeft()) {
      return res.json({error: {
        name: updateCustomer.value.name,
        message: updateCustomer.value.message
      }});
    }

    return res.json(updateCustomer.value);
  } catch (err) {
    return res.json({error: err});
  }
}

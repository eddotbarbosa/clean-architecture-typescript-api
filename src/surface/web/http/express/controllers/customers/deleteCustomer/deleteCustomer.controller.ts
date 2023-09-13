import {Request, Response} from 'express';
import {DeleteCustomerController} from '../../../../../../../infrastructure/controllers/customers/deleteCustomer/deleteCustomer.controller';

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const deleteCustomerController = new DeleteCustomerController();

    const deleteCustomer = await deleteCustomerController.deleteCustomerInPostgres({
      where: {
        id: req.params.id
      }
    });

    if (deleteCustomer.isLeft()) {
      return res.json({error: {
        name: deleteCustomer.value.name,
        message: deleteCustomer.value.message
      }});
    }

    return res.json(deleteCustomer.value);
  } catch (err) {
    return res.json({error: err});
  }
}

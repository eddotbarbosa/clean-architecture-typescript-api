import {Request, Response} from 'express';
import {FindCustomerByIdController} from '../../../../../../../infrastructure/controllers/customers/findCustomerById/findCustomerById.controller';

export const findCustomerById = async function (req: Request, res: Response) {
  try {
    const findCustomerByIdController = new FindCustomerByIdController();

    const findCustomerByIdOrError = await findCustomerByIdController.findCustomerByIdInPostgres({
      id: req.params.id
    });

    if (findCustomerByIdOrError.isLeft()) {
      return res.json({error: {
        name: findCustomerByIdOrError.value.name,
        message: findCustomerByIdOrError.value.message
      }});
    }

    return res.json(findCustomerByIdOrError.value);
  } catch (err) {
    return res.json({error: err});
  }
}

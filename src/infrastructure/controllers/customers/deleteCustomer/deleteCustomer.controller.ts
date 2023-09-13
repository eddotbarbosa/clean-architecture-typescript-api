import {DeleteCustomerUseCaseRequestDTO, DeleteCustomerUseCaseResponseDTO} from '../../../../application/usecases/customers/deleteCustomer/dto/deleteCustomer.dto';

import {DeleteCustomerUseCase} from '../../../../application/usecases/customers/deleteCustomer/deleteCustomer.usecase';

import {inMemoryCustomerRepositoryPersist} from '../../../repositories/inMemory/persistence/inMemoryCustomerPersistence';

import {left, right} from '../../../../shared/either';

import {PostgresCustomerRepository} from '../../../repositories/postgres/postgresCustomer.repository';

export class DeleteCustomerController {
  async deleteCustomerInMemory (request: DeleteCustomerUseCaseRequestDTO): DeleteCustomerUseCaseResponseDTO {
    const deleteCustomerUseCase = new DeleteCustomerUseCase(inMemoryCustomerRepositoryPersist);

    const deleteCustomer = await deleteCustomerUseCase.execute({
      where: {
        id: request.where.id
      }
    });

    if (deleteCustomer.isLeft()) {
      return left(deleteCustomer.value);
    }

    return right(deleteCustomer.value);
  };

  async deleteCustomerInPostgres (request: DeleteCustomerUseCaseRequestDTO): DeleteCustomerUseCaseResponseDTO {
    const postgresCustomerRepository = new PostgresCustomerRepository();

    const deleteCustomerUseCase = new DeleteCustomerUseCase(postgresCustomerRepository);

    const deleteCustomer = await deleteCustomerUseCase.execute({
      where: {
        id: request.where.id
      }
    });

    if (deleteCustomer.isLeft()) {
      return left(deleteCustomer.value);
    }

    return right(deleteCustomer.value);
  };
}

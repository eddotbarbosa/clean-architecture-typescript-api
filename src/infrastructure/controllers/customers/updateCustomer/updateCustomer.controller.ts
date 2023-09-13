import {UpdateCustomerUseCaseRequestDTO, UpdateCustomerUseCaseResponseDTO} from '../../../../application/usecases/customers/updateCustomer/dto/updateCustomer.dto';

import {UpdateCustomerUseCase} from '../../../../application/usecases/customers/updateCustomer/updateCustomer.usecase';

import {inMemoryCustomerRepositoryPersist} from '../../../repositories/inMemory/persistence/inMemoryCustomerPersistence';
import {PostgresCustomerRepository} from '../../../repositories/postgres/postgresCustomer.repository';

import {left, right} from '../../../../shared/either';


export class UpdateCustomerController {
  async updateCustomerInMemory(request: UpdateCustomerUseCaseRequestDTO): UpdateCustomerUseCaseResponseDTO {
    const updateCustomerUseCase = new UpdateCustomerUseCase(inMemoryCustomerRepositoryPersist);

    const updatedCustomer = await updateCustomerUseCase.execute({
      where: {
        id: request.where.id
      },
      data: {
        name: request.data.name,
        email: request.data.email,
        age: request.data.age
      }
    });

    if (updatedCustomer.isLeft()) {
      return left(updatedCustomer.value);
    }

    return right(updatedCustomer.value);
  }

  async updateCustomerInPostgres (request: UpdateCustomerUseCaseRequestDTO): UpdateCustomerUseCaseResponseDTO {
    const postgresCustomerRepository = new PostgresCustomerRepository();

    const updateCustomerUseCase = new UpdateCustomerUseCase(postgresCustomerRepository);

    const updatedCustomer = await updateCustomerUseCase.execute({
      where: {
        id: request.where.id
      },
      data: {
        name: request.data.name,
        email: request.data.email,
        age: request.data.age
      }
    });

    if (updatedCustomer.isLeft()) {
      return left(updatedCustomer.value);
    }

    return right(updatedCustomer.value);
  }
}

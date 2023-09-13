import {CreateCustomerUseCaseRequestDTO, CreateCustomerUseCaseResponseDTO} from '../../../../application/usecases/customers/createCustomer/dto/createCustomer.dto';

import {CreateCustomerUseCase} from '../../../../application/usecases/customers/createCustomer/createCustomer.usecase';

import {inMemoryCustomerRepositoryPersist} from '../../../repositories/inMemory/persistence/inMemoryCustomerPersistence';
import {PostgresCustomerRepository} from '../../../repositories/postgres/postgresCustomer.repository';

import {left, right } from '../../../../shared/either';

export class CreateCustomerController {
  async createCustomerInMemory (props: CreateCustomerUseCaseRequestDTO): CreateCustomerUseCaseResponseDTO {
    const customerOrError = await new CreateCustomerUseCase(inMemoryCustomerRepositoryPersist).execute({
      name: props.name,
      email: props.email,
      age: props.age
    });

    if (customerOrError.isLeft()) {
      return left(customerOrError.value);
    }

    return right(customerOrError.value);
  }

  async createCustomerInPostgres (props: CreateCustomerUseCaseRequestDTO): CreateCustomerUseCaseResponseDTO {
    const postgresCustomerRepository = new PostgresCustomerRepository();

    const customerOrError = await new CreateCustomerUseCase(postgresCustomerRepository).execute({
      name: props.name,
      email: props.email,
      age: props.age
    });

    if (customerOrError.isLeft()) {
      return left(customerOrError.value);
    }

    return right(customerOrError.value);
  }
}

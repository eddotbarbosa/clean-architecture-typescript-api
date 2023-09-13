import {FindCustomerByIdUseCaseRequestDTO, FindCustomerByIdUseCaseResponseDTO} from '../../../../application/usecases/customers/findCustomerById/dto/findCustomerById.dto';

import {FindCustomerByIdUseCase} from '../../../../application/usecases/customers/findCustomerById/findCustomerById.usecase';

import {inMemoryCustomerRepositoryPersist} from '../../../repositories/inMemory/persistence/inMemoryCustomerPersistence';
import {PostgresCustomerRepository} from '../../../repositories/postgres/postgresCustomer.repository';

import {left, right} from '../../../../shared/either';


export class FindCustomerByIdController {
  async findCustomerByIdInMemory (request: FindCustomerByIdUseCaseRequestDTO): FindCustomerByIdUseCaseResponseDTO {
    const findCustomerByIdUseCase = new FindCustomerByIdUseCase(inMemoryCustomerRepositoryPersist);

    const findCustomerById = await findCustomerByIdUseCase.execute({
      id: request.id
    });

    if (findCustomerById.isLeft()) {
      return left(findCustomerById.value);
    }

    return right(findCustomerById.value);
  };

  async findCustomerByIdInPostgres (request: FindCustomerByIdUseCaseRequestDTO): FindCustomerByIdUseCaseResponseDTO {
    const postgresCustomerRepository = new PostgresCustomerRepository();

    const findCustomerByIdUseCase = new FindCustomerByIdUseCase(postgresCustomerRepository);

    const findCustomerById = await findCustomerByIdUseCase.execute({
      id: request.id
    });

    if (findCustomerById.isLeft()) {
      return left(findCustomerById.value);
    }

    return right(findCustomerById.value);
  };
}

import {CreateCustomerUseCaseRequestDTO, CreateCustomerUseCaseResponseDTO} from './dto/createCustomer.dto';

import {createCustomerRepositoryInterface} from './interfaces/createCustomerRepository.interface';

import {left, right} from '../../../../shared/either';

export class CreateCustomerUseCase {
  private readonly createCustomerRepository: createCustomerRepositoryInterface;

  constructor (createCustomerRepository: createCustomerRepositoryInterface) {
    this.createCustomerRepository = createCustomerRepository;
  }

  async execute (input: CreateCustomerUseCaseRequestDTO): CreateCustomerUseCaseResponseDTO {
    const customerOrError = await this.createCustomerRepository.create(input);

    if (customerOrError.isLeft()) {
      return left(customerOrError.value);
    }

    return right(customerOrError.value);
  };
}

import {FindCustomerByIdRepositoryInterface} from './interfaces/findCustomerByIdRepository.interface';

import {FindCustomerByIdUseCaseRequestDTO, FindCustomerByIdUseCaseResponseDTO} from './dto/findCustomerById.dto';

import {left, right} from '../../../../shared/either';

export class FindCustomerByIdUseCase {
  private readonly findCustomerByIdRepository: FindCustomerByIdRepositoryInterface;

  constructor (findCustomerByIdRepository: FindCustomerByIdRepositoryInterface) {
    this.findCustomerByIdRepository = findCustomerByIdRepository;
  };

  async execute (props: FindCustomerByIdUseCaseRequestDTO): FindCustomerByIdUseCaseResponseDTO {
    const customerOrError = await this.findCustomerByIdRepository.findById({id: props.id});

    if (customerOrError.isLeft()) {
      return left(customerOrError.value);
    }

    return right(customerOrError.value);
  };
}

import {UpdateCustomerRepositoryInterface} from './interfaces/updateCustomerRepository.interface';

import {UpdateCustomerUseCaseRequestDTO, UpdateCustomerUseCaseResponseDTO} from './dto/updateCustomer.dto';

import {left, right} from '../../../../shared/either';

export class UpdateCustomerUseCase {
  private readonly updateCustomerRepository: UpdateCustomerRepositoryInterface;

  constructor(updateCustomerRepository: UpdateCustomerRepositoryInterface) {
    this.updateCustomerRepository = updateCustomerRepository;
  }

  async execute (props: UpdateCustomerUseCaseRequestDTO): Promise<UpdateCustomerUseCaseResponseDTO> {
    const updateCustomerOrError = await this.updateCustomerRepository.update(props);

    if (updateCustomerOrError.isLeft()) {
      return left(updateCustomerOrError.value);
    }

    return right(updateCustomerOrError.value);
  }
}

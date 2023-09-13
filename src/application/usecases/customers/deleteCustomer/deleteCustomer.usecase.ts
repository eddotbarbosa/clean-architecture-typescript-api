import {DeleteCustomerRepositoryInterface} from './interfaces/deleteCustomerRepository.interface';

import {DeleteCustomerUseCaseRequestDTO, DeleteCustomerUseCaseResponseDTO} from './dto/deleteCustomer.dto';

import {left, right} from '../../../../shared/either';

export class DeleteCustomerUseCase {
  private readonly deleteCustomerRepository: DeleteCustomerRepositoryInterface;

  constructor(deleteCustomerRepository: DeleteCustomerRepositoryInterface) {
    this.deleteCustomerRepository = deleteCustomerRepository;
  }

  async execute (props: DeleteCustomerUseCaseRequestDTO): DeleteCustomerUseCaseResponseDTO {
    const deleteCustomer = await this.deleteCustomerRepository.delete({
      where: {
        id: props.where.id
      }
    });

    if (deleteCustomer.isLeft()) {
      return left(deleteCustomer.value);
    }

    return right(deleteCustomer.value);
  }
}

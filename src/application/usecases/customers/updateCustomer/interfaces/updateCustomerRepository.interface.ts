import {UpdateCustomerUseCaseRequestDTO, UpdateCustomerUseCaseResponseDTO} from '../dto/updateCustomer.dto';

export interface UpdateCustomerRepositoryInterface {
  update: (props: UpdateCustomerUseCaseRequestDTO) => UpdateCustomerUseCaseResponseDTO
}

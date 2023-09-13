import {CreateCustomerUseCaseRequestDTO, CreateCustomerUseCaseResponseDTO} from '../dto/createCustomer.dto';

export interface createCustomerRepositoryInterface {
  create: (props: CreateCustomerUseCaseRequestDTO) => CreateCustomerUseCaseResponseDTO;
}

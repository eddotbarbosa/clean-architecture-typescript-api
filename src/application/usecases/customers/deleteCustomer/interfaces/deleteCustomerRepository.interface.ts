import {DeleteCustomerUseCaseRequestDTO, DeleteCustomerUseCaseResponseDTO} from '../dto/deleteCustomer.dto'

export interface DeleteCustomerRepositoryInterface {
  delete: (props: DeleteCustomerUseCaseRequestDTO) => DeleteCustomerUseCaseResponseDTO;
}

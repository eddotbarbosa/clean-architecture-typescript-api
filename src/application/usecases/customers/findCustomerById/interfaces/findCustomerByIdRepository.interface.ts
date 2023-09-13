import {FindCustomerByIdUseCaseRequestDTO, FindCustomerByIdUseCaseResponseDTO} from '../dto/findCustomerById.dto';

export interface FindCustomerByIdRepositoryInterface {
  findById: (props: FindCustomerByIdUseCaseRequestDTO) => FindCustomerByIdUseCaseResponseDTO;
}

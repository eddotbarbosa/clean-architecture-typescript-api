import {CustomerEntityType} from '../../../../../domain/entities/customer/type/customerEntity.type'
import {Either} from '../../../../../shared/either'

export type UpdateCustomerUseCaseRequestDTO = {
  where: Pick<CustomerEntityType, "id">,
  data: Partial<Omit<CustomerEntityType, 'id'>>
}

export type UpdateCustomerUseCaseResponseDTO = Promise<Either<Error, CustomerEntityType>>;

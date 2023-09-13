import {CustomerEntityType} from '../../../../../domain/entities/customer/type/customerEntity.type'
import {Either} from '../../../../../shared/either';

export type DeleteCustomerUseCaseRequestDTO = {
  where: Pick<CustomerEntityType, 'id'>
};

export type DeleteCustomerUseCaseResponseDTO = Promise<Either<Error, CustomerEntityType>>;

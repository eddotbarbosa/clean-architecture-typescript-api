import {CustomerEntityType} from '../../../../../domain/entities/customer/type/customerEntity.type';

import {Either} from '../../../../../shared/either';

export type CreateCustomerUseCaseRequestDTO = Omit<CustomerEntityType, "id">;
export type CreateCustomerUseCaseResponseDTO = Promise<Either<Error, CustomerEntityType>>;

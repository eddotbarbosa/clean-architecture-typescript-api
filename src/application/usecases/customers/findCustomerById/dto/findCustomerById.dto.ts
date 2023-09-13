import {CustomerEntityType} from '../../../../../domain/entities/customer/type/customerEntity.type';
import {Either} from '../../../../../shared/either';

export type FindCustomerByIdUseCaseRequestDTO = Pick<CustomerEntityType, "id">;

export type FindCustomerByIdUseCaseResponseDTO = Promise<Either<Error , CustomerEntityType>>;

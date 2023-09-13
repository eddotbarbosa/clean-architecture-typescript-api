import {CustomerEntity} from '../customer.entity'

export type CustomerEntityType = Pick<CustomerEntity, 'id' | 'name' | 'email' | 'age'>;

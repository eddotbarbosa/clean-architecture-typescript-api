import {describe, it, expect} from 'vitest';

import {InMemoryCustomerRepository} from '../../../../infrastructure/repositories/inMemory/inMemoryCustomer.repository';
import {PostgresCustomerRepository} from '../../../../infrastructure/repositories/postgres/postgresCustomer.repository';

import {DeleteCustomerUseCase} from './deleteCustomer.usecase';

import {CustomerEntityType} from '../../../../domain/entities/customer/type/customerEntity.type';


describe('delete customer use case tests', () => {
  describe('delete customer in memory use case tests', () => {
    it('should pass when delete customer', async () => {
      const customerRepository = new InMemoryCustomerRepository();

      const createCustomer = await customerRepository.create({
        name: 'test user',
        email: 'testuser@email.com',
        age: 18
      });

      const createdCustomer = createCustomer.value as CustomerEntityType;

      const deleteCustomerUseCase = new DeleteCustomerUseCase(customerRepository);

      const deleteCustomer = await deleteCustomerUseCase.execute({
        where: {
          id: createdCustomer.id
        }
      });

      const deletedCustomer = deleteCustomer.value as CustomerEntityType;

      expect(deleteCustomer.isRight()).toBeTruthy();
      expect(deletedCustomer).toEqual(createdCustomer);
    });
  });

  describe('delete customer in postgres use case tests', () => {
    it('should pass when delete customer', async () => {
      const customerRepository = new PostgresCustomerRepository();

      const createCustomer = await customerRepository.create({
        name: 'test user',
        email: 'testuser@email.com',
        age: 18
      });

      const createdCustomer = createCustomer.value as CustomerEntityType;

      const deleteCustomerUseCase = new DeleteCustomerUseCase(customerRepository);

      const deleteCustomer = await deleteCustomerUseCase.execute({
        where: {
          id: createdCustomer.id
        }
      });

      const deletedCustomer = deleteCustomer.value as CustomerEntityType;

      expect(deleteCustomer.isRight()).toBeTruthy();
      expect(deletedCustomer).toEqual(createdCustomer);
    });
  });
});

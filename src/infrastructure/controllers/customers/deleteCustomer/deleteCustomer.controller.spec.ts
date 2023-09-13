import {describe, expect, it} from 'vitest';

import {CreateCustomerController} from '../createCustomer/createCustomer.controller';
import {DeleteCustomerController} from './deleteCustomer.controller';

import {CustomerEntityType} from '../../../../domain/entities/customer/type/customerEntity.type';

describe('delete customer controller tests', () => {
  describe('update customer in memory tests', () => {
    it('should pass when update customer in memory', async () => {
      const createCustomerController = new CreateCustomerController();

      const createCustomer = await createCustomerController.createCustomerInMemory({
        name: 'test user',
        email: 'testuseremail@email.com',
        age: 18
      });

      const createdCustomer = createCustomer.value as CustomerEntityType;

      const deleteCustomerController = new DeleteCustomerController();

      const deleteCustomer = await deleteCustomerController.deleteCustomerInMemory({
        where: {
          id: createdCustomer.id
        }
      });

      const deletedCustomer = deleteCustomer.value as CustomerEntityType;

      expect(deleteCustomer.isRight()).toBeTruthy();
      expect(deletedCustomer).toHaveProperty('id');
    });
  });

  describe('delete customer in postgres tests', () => {
    it('should pass when delete customer', async () => {
      const createCustomerController = new CreateCustomerController();

      const createCustomer = await createCustomerController.createCustomerInPostgres({
        name: 'test user',
        email: 'testuseremail@email.com',
        age: 18
      });

      const createdCustomer = createCustomer.value as CustomerEntityType;

      const deleteCustomerController = new DeleteCustomerController();

      const deleteCustomer = await deleteCustomerController.deleteCustomerInPostgres({
        where: {
          id: createdCustomer.id
        }
      });

      const deletedCustomer = deleteCustomer.value as CustomerEntityType;

      expect(deleteCustomer.isRight()).toBeTruthy();
      expect(deletedCustomer).toHaveProperty('id');
    });
  })
});

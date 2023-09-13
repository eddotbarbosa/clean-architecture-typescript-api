import {afterAll, describe, expect, it} from 'vitest';

import {CreateCustomerController} from '../createCustomer/createCustomer.controller';
import {UpdateCustomerController} from './updateCustomer.controller';

import {CustomerEntityType} from '../../../../domain/entities/customer/type/customerEntity.type';

import {prisma} from '../../../../surface/database/orms/prisma/prismaClient';

describe('update customer controller tests', () => {
  describe('update customer in memory tests', () => {
    it('should pass when update customer', async () => {
      const createCustomerController = new CreateCustomerController();

      const createCustomer = await createCustomerController.createCustomerInMemory({
        name: 'test user',
        email: 'testuseremail@email.com',
        age: 18
      });

      const createdCustomer = createCustomer.value as CustomerEntityType;

      const updateCustomerController = new UpdateCustomerController();

      const updateCustomer = await updateCustomerController.updateCustomerInMemory({
        where: {
          id: createdCustomer.id
        },
        data: {
          name: 'test user updated'
        }
      });

      const updatedCustomer = updateCustomer.value as CustomerEntityType;

      expect(updateCustomer.isRight()).toBeTruthy();
      expect(updatedCustomer.name).toEqual('test user updated');
    });
  });

  describe('update customer in postgres tests', () => {
    let createCustomerId: string;

    afterAll(async () => {
      await prisma.customer.deleteMany({
        where: {
          id: {
            in: [createCustomerId]
          }
        }
      });
    });

    it('should pass when update customer by id', async () => {
      const createCustomerController = new CreateCustomerController();

      const createCustomer = await createCustomerController.createCustomerInPostgres({
        name: 'test user',
        email: 'testuseremail@email.com',
        age: 18
      });

      const createdCustomer = createCustomer.value as CustomerEntityType;

      createCustomerId = createdCustomer.id;

      const updateCustomerController = new UpdateCustomerController();

      const findCustomer = await updateCustomerController.updateCustomerInPostgres({
        where: {
          id: createdCustomer.id
        },
        data: {
          name: 'test user updated'
        }
      });

      const updatedCustomer = findCustomer.value as CustomerEntityType;

      expect(findCustomer.isRight()).toBeTruthy();
      expect(updatedCustomer.id).toEqual(createdCustomer.id);
    });
  })
});

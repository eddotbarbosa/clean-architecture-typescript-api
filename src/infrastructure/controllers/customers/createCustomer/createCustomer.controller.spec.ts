import {afterAll, describe, expect, it} from 'vitest';

import {CreateCustomerController} from './createCustomer.controller';
import {CustomerEntityType} from '../../../../domain/entities/customer/type/customerEntity.type';

import {prisma} from '../../../../surface/database/orms/prisma/prismaClient';

describe('create customer controller tests', () => {
  describe('create customer in memory tests', () => {
    it('should pass when create customer', async () => {
      const createCustomerController = new CreateCustomerController();

      const createCustomer = await createCustomerController.createCustomerInMemory({
        name: 'test user',
        email: 'testuseremail@email.com',
        age: 18
      });

      const createdCustomer = createCustomer.value as CustomerEntityType;

      expect(createCustomer.isRight()).toBeTruthy();
      expect(createdCustomer.name).toEqual('test user');
    });
  });

  describe('create customer in postgres tests', () => {
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

    it('should pass when create customer', async () => {
      const createCustomerController = new CreateCustomerController();

      const createCustomer = await createCustomerController.createCustomerInPostgres({
        name: 'test user',
        email: 'testuseremail@email.com',
        age: 18
      });

      const createdCustomer = createCustomer.value as CustomerEntityType;

      createCustomerId = createdCustomer.id;

      expect(createCustomer.isRight()).toBeTruthy();
      expect(createdCustomer.name).toEqual('test user');
    });
  })
});

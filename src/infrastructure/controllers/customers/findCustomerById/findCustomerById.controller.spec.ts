import {afterAll, describe, expect, it} from 'vitest';

import {CreateCustomerController} from '../createCustomer/createCustomer.controller';
import {FindCustomerByIdController} from './findCustomerById.controller';

import {CustomerEntityType} from '../../../../domain/entities/customer/type/customerEntity.type';

import {prisma} from '../../../../surface/database/orms/prisma/prismaClient';

describe('find customer by id controller tests', () => {
  describe('find customer in memory tests', () => {
    it('should pass when find customer by id', async () => {
      const createCustomerController = new CreateCustomerController();

      const createCustomer = await createCustomerController.createCustomerInMemory({
        name: 'test user',
        email: 'testuseremail@email.com',
        age: 18
      });

      const createdCustomer = createCustomer.value as CustomerEntityType;

      const findCustomerByIdController = new FindCustomerByIdController();

      const findCustomer = await findCustomerByIdController.findCustomerByIdInMemory({
        id: createdCustomer.id
      });

      const foundCustomer = findCustomer.value as CustomerEntityType;

      expect(findCustomer.isRight()).toBeTruthy();
      expect(foundCustomer.id).toEqual(createdCustomer.id);
    });
  });

  describe('find customer in postgres tests', () => {
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

    it('should pass when find customer by id', async () => {
      const createCustomerController = new CreateCustomerController();

      const createCustomer = await createCustomerController.createCustomerInPostgres({
        name: 'test user',
        email: 'testuseremail@email.com',
        age: 18
      });

      const createdCustomer = createCustomer.value as CustomerEntityType;

      createCustomerId = createdCustomer.id;

      const findCustomerByIdController = new FindCustomerByIdController();

      const findCustomer = await findCustomerByIdController.findCustomerByIdInPostgres({
        id: createdCustomer.id
      });

      const foundCustomer = findCustomer.value as CustomerEntityType;

      expect(findCustomer.isRight()).toBeTruthy();
      expect(foundCustomer.id).toEqual(createdCustomer.id);
    });
  })
});

import {afterAll, describe, expect, it} from 'vitest';

import {prisma} from '../../../../surface/database/orms/prisma/prismaClient';

import {InMemoryCustomerRepository} from '../../../../infrastructure/repositories/inMemory/inMemoryCustomer.repository';

import {UpdateCustomerUseCase} from './updateCustomer.usecase';

import {CustomerEntityType} from '../../../../domain/entities/customer/type/customerEntity.type';
import {PostgresCustomerRepository} from '../../../../infrastructure/repositories/postgres/postgresCustomer.repository';

describe('update customer use case tests', () => {
  describe('update customer in memory use case tests', () => {
    it('should pass when update a customer in memory repository', async () => {
      const customerRepository = new InMemoryCustomerRepository();

      const createCustomer = await customerRepository.create({
        name: 'test user',
        email: 'testuser@email.com',
        age: 18
      });

      const createdCustomer = createCustomer.value as CustomerEntityType;

      const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);

      const updateCustomer = await updateCustomerUseCase.execute({
        where: {
          id: createdCustomer.id
        },
        data: {
          name: 'test user updated'
        }
      });

      const updatedCustomer = updateCustomer.value as CustomerEntityType;

      expect(updateCustomer.isRight()).toBeTruthy();
      expect(updatedCustomer.id).toEqual(createdCustomer.id);
    });
  })

  describe('update customer in postgres use case tests', () => {
    let updateCustomerId: string;

    afterAll(async () => {
      await prisma.customer.delete({
        where: {
          id: updateCustomerId
        }
      });
    });

    it('should pass when update a customer in postgres repository', async () => {
      const customerRepository = new PostgresCustomerRepository();

      const createCustomer = await customerRepository.create({
        name: 'test user',
        email: 'testuser@email.com',
        age: 18
      });

      const createdCustomer = createCustomer.value as CustomerEntityType;

      updateCustomerId = createdCustomer.id;

      const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);

      const updateCustomer = await updateCustomerUseCase.execute({
        where: {
          id: createdCustomer.id
        },
        data: {
          name: 'test user updated'
        }
      });

      const updatedCustomer = updateCustomer.value as CustomerEntityType;

      expect(updateCustomer.isRight()).toBeTruthy();
      expect(updatedCustomer.id).toEqual(createdCustomer.id);
    });
  });
});

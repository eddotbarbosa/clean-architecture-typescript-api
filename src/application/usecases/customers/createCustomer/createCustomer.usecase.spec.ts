import {describe, it, expect, afterAll} from 'vitest';

import {CreateCustomerUseCase} from './createCustomer.usecase';

import {CustomerEntityType} from '../../../../domain/entities/customer/type/customerEntity.type';

import {InMemoryCustomerRepository} from '../../../../infrastructure/repositories/inMemory/inMemoryCustomer.repository';
import {PostgresCustomerRepository} from '../../../../infrastructure/repositories/postgres/postgresCustomer.repository';
import { prisma } from '../../../../surface/database/orms/prisma/prismaClient';

describe('create customer use case tests', () => {
  describe('create customer in memory use case tests', () => {
    it('should pass when create a customer', async () => {
      const inMemoryCustomerRepository = new InMemoryCustomerRepository();

      const createCustomerUseCase = new CreateCustomerUseCase(inMemoryCustomerRepository);

      const createCustomer = await createCustomerUseCase.execute({
        name: 'test user',
        email: 'testuser@email.com',
        age: 18
      });

      const createdCustomer = createCustomer.value as CustomerEntityType;

      expect(createCustomer.isRight()).toBeTruthy();
      expect(createdCustomer.name).toEqual('test user');
    });

    it('should not pass because the age is invalid', async () => {
      const inMemoryCustomerRepository = new InMemoryCustomerRepository();

      const createCustomerUseCase = new CreateCustomerUseCase(inMemoryCustomerRepository);

      const createCustomer = await createCustomerUseCase.execute({
        name: 'test user',
        email: 'testuser@email.com',
        age: 17
      });

      const createdCustomer = createCustomer.value as Error;

      expect(createCustomer.isLeft()).toBeTruthy();
      expect(createdCustomer.name).toEqual('InvalidAgeError');
      expect(createdCustomer.message).toEqual('invalid age: 17');
    });
  });

  describe('create customer postgress use case tests', () => {
    let createCustomerId: string;

    afterAll(async () => {
      await prisma.customer.delete({
        where: {
          id: createCustomerId
        }
      });
    });

    it('should pass when create a customer', async () => {
      const postgresCustomerRepository = new PostgresCustomerRepository();

      const createCustomerUseCase = new CreateCustomerUseCase(postgresCustomerRepository);

      const createCustomer = await createCustomerUseCase.execute({
        name: 'test user',
        email: 'testuser@email.com',
        age: 18
      })

      const createdCustomer = createCustomer.value as CustomerEntityType;

      createCustomerId = createdCustomer.id;

      expect(createCustomer.isRight()).toBeTruthy();
      expect(createdCustomer.name).toEqual('test user');
    });

    it('should not pass because the age is invalid', async () => {
      const postgresCustomerRepository = new PostgresCustomerRepository();

      const createCustomerUseCase = new CreateCustomerUseCase(postgresCustomerRepository);

      const createCustomer = await createCustomerUseCase.execute({
        name: 'test user',
        email: 'testuser@email.com',
        age: 17
      });

      const createdCustomer = createCustomer.value as Error;

      expect(createCustomer.isLeft()).toBeTruthy();
      expect(createdCustomer.name).toEqual('InvalidAgeError');
      expect(createdCustomer.message).toEqual('invalid age: 17');
    });
  });
});

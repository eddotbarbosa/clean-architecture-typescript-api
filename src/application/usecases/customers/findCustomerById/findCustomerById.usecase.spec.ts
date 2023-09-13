import {describe, it, expect, afterAll} from 'vitest';

import {prisma} from '../../../../surface/database/orms/prisma/prismaClient';

import {InMemoryCustomerRepository} from '../../../../infrastructure/repositories/inMemory/inMemoryCustomer.repository';

import {FindCustomerByIdUseCase} from './findCustomerById.usecase';

import {CustomerEntityType} from '../../../../domain/entities/customer/type/customerEntity.type';
import {PostgresCustomerRepository} from '../../../../infrastructure/repositories/postgres/postgresCustomer.repository';

describe('find customer by id use case tests', () => {
  describe('find customer by id in memory use case tests', () => {
    it('should pass when find a customer', async () => {
      const repository = new InMemoryCustomerRepository();

      const createCustomer = await repository.create({
        name: 'test user1',
        email: 'testuser@email.com',
        age: 18
      });

      const createdCustomer = createCustomer.value as CustomerEntityType;

      await repository.create({
        name: 'test user2',
        email: 'testuser2@email.com',
        age: 18
      });

      const findCustomerByIdUseCase = new FindCustomerByIdUseCase(repository);

      const findCustomer = await findCustomerByIdUseCase.execute({id: createdCustomer.id});

      const foundCustomer = findCustomer.value as CustomerEntityType;

      expect(findCustomer.isRight()).toBeTruthy();
      expect(foundCustomer.id).toEqual(createdCustomer.id);
    });

    it('should not pass when customer is not found', async () => {
      const repository = new InMemoryCustomerRepository();

      await repository.create({
        name: 'test user',
        email: 'testuser@email.com',
        age: 18
      });

      const findCustomerByIdUseCase = new FindCustomerByIdUseCase(repository);

      const findCustomer = await findCustomerByIdUseCase.execute({id: '179c5846-66d3-47ab-931f-08897587a4fa'});

      const foundCustomer = findCustomer.value as Error;

      expect(findCustomer.isLeft()).toBeTruthy();
      expect(foundCustomer.name).toEqual('CustomerNotFoundError');
      expect(foundCustomer.message).toEqual('customer not found');
    });
  });

  describe('find customer by id in postgres use case tests', () => {
    let foundCustomerId: string;
    let foundCustomerId2: string;
    let notFoundCustomerId: string;

    afterAll(async () => {
      await prisma.customer.deleteMany({
        where: {
          id: {
            in: [foundCustomerId, foundCustomerId2, notFoundCustomerId]
          }
        }
      });
    });

    it('should pass when find a customer', async () => {
      const repository = new PostgresCustomerRepository();

      const createCustomer = await repository.create({
        name: 'test user1',
        email: 'testuser@email.com',
        age: 18
      });

      const createdCustomer = createCustomer.value as CustomerEntityType;

      foundCustomerId = createdCustomer.id;

      const createCustomer2 = await repository.create({
        name: 'test user2',
        email: 'testuser2@email.com',
        age: 18
      });

      const createdCustomer2 = createCustomer2.value as CustomerEntityType;

      foundCustomerId2 = createdCustomer2.id;

      const findCustomerByIdUseCase = new FindCustomerByIdUseCase(repository);

      const findCustomer = await findCustomerByIdUseCase.execute({id: createdCustomer.id});

      const foundCustomer = findCustomer.value as CustomerEntityType;

      expect(findCustomer.isRight()).toBeTruthy();
      expect(foundCustomer.id).toEqual(createdCustomer.id);
    });

    it('should not pass when customer is not found', async () => {
      const repository = new PostgresCustomerRepository();

      const createCustomer = await repository.create({
        name: 'test user',
        email: 'testuser@email.com',
        age: 18
      });

      const createdCustomer = createCustomer.value as CustomerEntityType;

      notFoundCustomerId = createdCustomer.id;

      const findCustomerByIdUseCase = new FindCustomerByIdUseCase(repository);

      const findCustomer = await findCustomerByIdUseCase.execute({id: '179c5846-66d3-47ab-931f-08897587a4fa'});

      const foundCustomer = findCustomer.value as Error;

      expect(findCustomer.isLeft()).toBeTruthy();
      expect(foundCustomer.name).toEqual('CustomerNotFoundError');
      expect(foundCustomer.message).toEqual('customer not found');
    });
  });
});

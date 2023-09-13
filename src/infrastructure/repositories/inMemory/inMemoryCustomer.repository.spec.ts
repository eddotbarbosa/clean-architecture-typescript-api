import {describe, it, expect} from 'vitest';

import {InMemoryCustomerRepository} from './inMemoryCustomer.repository';
import {CustomerEntityType} from '../../../domain/entities/customer/type/customerEntity.type';

describe('in memory customer repository tests', () => {
  describe('create customer tests', () => {
    it('should pass when create a customer', async () => {
      const customerRepository = new InMemoryCustomerRepository();

      const createCustomer = await customerRepository.create({
        name: 'test user',
        email: 'testuseremail@email.com',
        age: 18
      });

      const createdCustomer = createCustomer.value as CustomerEntityType;

      expect(createCustomer.isRight()).toBeTruthy();
      expect(createdCustomer.name).toEqual('test user');
    });

    it('should not pass because age is invalid', async () => {
      const customerRepository = new InMemoryCustomerRepository();

      const createCustomer = await customerRepository.create({
        name: 'test user',
        email: 'testuseremail@email.com',
        age: 17
      });

      const createdCustomer = createCustomer.value as Error;

      expect(createCustomer.isLeft()).toBeTruthy();
      expect(createdCustomer.name).toEqual('InvalidAgeError');
    });
  });

  describe('find by id customer tests', () => {
    it('should pass when find a customer', async () => {
      const customerRepository = new InMemoryCustomerRepository();

      const createCustomer = await customerRepository.create({
        name: 'test user',
        email: 'testuseremail@email.com',
        age: 18
      });

      const createdCustomer = createCustomer.value as CustomerEntityType;

      await customerRepository.create({
        name: 'test user2',
        email: 'testuseremail2@email.com',
        age: 18
      });

      const findCustomer = await customerRepository.findById({
        id: createdCustomer.id
      });

      const foundCustomer = findCustomer.value as CustomerEntityType;

      expect(findCustomer.isRight()).toBeTruthy();
      expect(foundCustomer.id).toEqual(createdCustomer.id);
    });
  });

  describe('updated customer tests', () => {
    it('should pass when update a customer', async () => {
      const customerRepository = new InMemoryCustomerRepository();

      const createCustomer = await customerRepository.create({
        name: 'test user',
        email: 'testuseremail@email.com',
        age: 18
      });

      const createdCustomer = createCustomer.value as CustomerEntityType;

      await customerRepository.create({
        name: 'test user2',
        email: 'testuseremail2@email.com',
        age: 18
      });

      const updateCustomer = await customerRepository.update({
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
      expect(updatedCustomer.name).toEqual('test user updated');
    });
  });

  describe('delete customer tests', () => {
    it('should pass when delete a customer', async () => {
      const customerRepository = new InMemoryCustomerRepository();

      const createCustomer = await customerRepository.create({
        name: 'test user',
        email: 'testuseremail@email.com',
        age: 18
      });

      const createdCustomer = createCustomer.value as CustomerEntityType;

      const deleteCustomer= await customerRepository.delete({
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

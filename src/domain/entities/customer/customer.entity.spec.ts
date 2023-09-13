import {describe, it, expect} from 'vitest';

import {CustomerEntity} from './customer.entity';

import {CustomerEntityType} from './type/customerEntity.type';

describe('customer entity tests', () => {
  it('should pass when create a customer', async () => {
    const createCustomer = CustomerEntity.create({
      name: 'test user',
      email: 'testuser@email.com',
      age: 18
    });

    const createdCustomer = createCustomer.value as CustomerEntityType;

    expect(createCustomer.isRight()).toBeTruthy();
    expect(createdCustomer).toBeInstanceOf(CustomerEntity);
    expect(createdCustomer.name).toEqual('test user');
    expect(createdCustomer.email).toEqual('testuser@email.com');
    expect(createdCustomer.age).toEqual(18);
  });

  it('should not pass because the age is invalid', () => {
    const createCustomer = CustomerEntity.create({
      name: 'test user',
      email: 'testuser@email.com',
      age: 17
    });

    const createdCustomer = createCustomer.value as Error;

    expect(createCustomer.isLeft()).toBeTruthy();
    expect(createdCustomer).toBeInstanceOf(Error);
    expect(createdCustomer.name).toBe('InvalidAgeError');
    expect(createdCustomer.message).toBe('invalid age: 17');
  });
});

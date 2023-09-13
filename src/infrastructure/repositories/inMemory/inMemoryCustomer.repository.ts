import {CustomerEntity} from '../../../domain/entities/customer/customer.entity';
import {CustomerEntityType} from '../../../domain/entities/customer/type/customerEntity.type';

import {createCustomerRepositoryInterface} from '../../../application/usecases/customers/createCustomer/interfaces/createCustomerRepository.interface';
import {DeleteCustomerRepositoryInterface} from '../../../application/usecases/customers/deleteCustomer/interfaces/deleteCustomerRepository.interface';
import {FindCustomerByIdRepositoryInterface} from '../../../application/usecases/customers/findCustomerById/interfaces/findCustomerByIdRepository.interface';
import {UpdateCustomerRepositoryInterface} from '../../../application/usecases/customers/updateCustomer/interfaces/updateCustomerRepository.interface';

import {CreateCustomerUseCaseRequestDTO, CreateCustomerUseCaseResponseDTO} from '../../../application/usecases/customers/createCustomer/dto/createCustomer.dto';
import {FindCustomerByIdUseCaseRequestDTO, FindCustomerByIdUseCaseResponseDTO} from '../../../application/usecases/customers/findCustomerById/dto/findCustomerById.dto';
import {DeleteCustomerUseCaseRequestDTO, DeleteCustomerUseCaseResponseDTO} from '../../../application/usecases/customers/deleteCustomer/dto/deleteCustomer.dto';
import {UpdateCustomerUseCaseRequestDTO, UpdateCustomerUseCaseResponseDTO} from '../../../application/usecases/customers/updateCustomer/dto/updateCustomer.dto';

import {left, right} from '../../../shared/either';
import {CustomerNotFoundError} from '../errors/customerNotFound.error';
import {CustomerNotDeletedError} from '../errors/customerNotDeleted.error';

export class InMemoryCustomerRepository implements
createCustomerRepositoryInterface,
FindCustomerByIdRepositoryInterface,
UpdateCustomerRepositoryInterface,
DeleteCustomerRepositoryInterface {
  public repositoryData: CustomerEntityType[] = [];

  async create (props: CreateCustomerUseCaseRequestDTO): CreateCustomerUseCaseResponseDTO {
    const customerOrError = CustomerEntity.create(props);

    if (customerOrError.isLeft()) {
      return left(customerOrError.value);
    }

    await this.repositoryData.push(customerOrError.value);

    return right(customerOrError.value);
  };

  async findById (props: FindCustomerByIdUseCaseRequestDTO): FindCustomerByIdUseCaseResponseDTO {
    const customer = await this.repositoryData.find((item) => {
      return item.id === props.id;
    });

    if (!customer) {
      return left(new CustomerNotFoundError());
    }

    return right(customer);
  }

  async update (props: UpdateCustomerUseCaseRequestDTO): UpdateCustomerUseCaseResponseDTO {
    const findCustomer = await this.repositoryData.find((item) => {
      return item.id === props.where.id;
    });

    if (!findCustomer) {
      return left(new CustomerNotFoundError());
    }

    const updatedCustomer: CustomerEntityType = {
      id: findCustomer.id,
      name: props.data.name || findCustomer.name,
      email: props.data.email || findCustomer.email,
      age: props.data.age || findCustomer.age
    }

    const customersRepositoryData: CustomerEntityType[] = await this.repositoryData.map((item) => {
      return (item['id'] === findCustomer.id) ? updatedCustomer : item;
    });

    this.repositoryData = customersRepositoryData;

    return right(updatedCustomer);
  }

  async delete (props: DeleteCustomerUseCaseRequestDTO): DeleteCustomerUseCaseResponseDTO {
    const findCustomer = await this.repositoryData.find((item) => {
      return item.id === props.where.id;
    });

    if (!findCustomer) {
      return left(new CustomerNotFoundError());
    }

    const customersRepositoryData: CustomerEntityType[] = await this.repositoryData.filter((item) => {
      return item['id'] !== findCustomer.id;
    });

    this.repositoryData = customersRepositoryData;

    const isDeleted = await this.repositoryData.find((item) => {
      return item.id === props.where.id;
    });

    if(isDeleted) {
      return left(new CustomerNotDeletedError());
    }

    return right(findCustomer);
  }
}

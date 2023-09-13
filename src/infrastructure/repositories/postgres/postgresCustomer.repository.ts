import {CustomerEntity} from '../../../domain/entities/customer/customer.entity';

import {createCustomerRepositoryInterface} from '../../../application/usecases/customers/createCustomer/interfaces/createCustomerRepository.interface';
import {DeleteCustomerRepositoryInterface} from '../../../application/usecases/customers/deleteCustomer/interfaces/deleteCustomerRepository.interface';
import {FindCustomerByIdRepositoryInterface} from '../../../application/usecases/customers/findCustomerById/interfaces/findCustomerByIdRepository.interface';
import {UpdateCustomerRepositoryInterface} from '../../../application/usecases/customers/updateCustomer/interfaces/updateCustomerRepository.interface';

import {CreateCustomerUseCaseRequestDTO, CreateCustomerUseCaseResponseDTO} from '../../../application/usecases/customers/createCustomer/dto/createCustomer.dto';
import {FindCustomerByIdUseCaseRequestDTO, FindCustomerByIdUseCaseResponseDTO} from '../../../application/usecases/customers/findCustomerById/dto/findCustomerById.dto';
import {UpdateCustomerUseCaseRequestDTO, UpdateCustomerUseCaseResponseDTO} from '../../../application/usecases/customers/updateCustomer/dto/updateCustomer.dto';
import {DeleteCustomerUseCaseRequestDTO, DeleteCustomerUseCaseResponseDTO} from '../../../application/usecases/customers/deleteCustomer/dto/deleteCustomer.dto';

import {prisma} from '../../../surface/database/orms/prisma/prismaClient';

import {left, right} from '../../../shared/either';
import {CustomerNotFoundError} from '../errors/customerNotFound.error';

export class PostgresCustomerRepository implements
createCustomerRepositoryInterface,
FindCustomerByIdRepositoryInterface,
UpdateCustomerRepositoryInterface,
DeleteCustomerRepositoryInterface {
  async create (props: CreateCustomerUseCaseRequestDTO): CreateCustomerUseCaseResponseDTO {
    const customerOrError = await CustomerEntity.create(props);

    if (customerOrError.isLeft()) {
      return left(customerOrError.value);
    }

    const createCustomer = await prisma.customer.create({
      data: {
        id: customerOrError.value.id,
        name: customerOrError.value.name,
        email: customerOrError.value.email,
        age: customerOrError.value.age
      }
    });

    return right(createCustomer);
  }

  async findById (props: FindCustomerByIdUseCaseRequestDTO): FindCustomerByIdUseCaseResponseDTO {
    const customer = await prisma.customer.findUnique({
      where: {
        id: props.id
      }
    });

    if (!customer) {
      return left(new CustomerNotFoundError());
    }

    return right(customer);
  }

  async update (props: UpdateCustomerUseCaseRequestDTO): UpdateCustomerUseCaseResponseDTO {
    const updateCustomer = await prisma.customer.update({
      where: {
        id: props.where.id
      },
      data: {
        name: props.data.name || undefined,
        email: props.data.email || undefined,
        age: props.data.age || undefined
      }
    });

    if (!updateCustomer) {
      return left(new CustomerNotFoundError());
    }

    return right(updateCustomer);
  }

  async delete (props: DeleteCustomerUseCaseRequestDTO): DeleteCustomerUseCaseResponseDTO {
    const deletedCustomer = await prisma.customer.delete({
      where: {
        id: props.where.id
      }
    });

    if (!deletedCustomer) {
      return left(new CustomerNotFoundError());
    }

    return right(deletedCustomer);
  }
}

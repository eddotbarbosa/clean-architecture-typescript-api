import {RandomId} from '../../services/randomId';

import {Either, left, right} from '../../../shared/either';
import {InvalidAgeError} from './errors/invalidAge.error';

type CustomerEntityProps = {
  id?: string;
  name: string;
  email: string;
  age: number;
};

export class CustomerEntity {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly age: number;

  private constructor (props: CustomerEntityProps) {
    this.id = RandomId.create(props.id).id;
    this.name = props.name;
    this.email = props.email;
    this.age = props.age;
  }

  public static create (props: CustomerEntityProps): Either<InvalidAgeError, CustomerEntity> {
    if (props.age < 18) {
      return left(new InvalidAgeError(props.age));
    }

    return right(new CustomerEntity(props));
  }
}

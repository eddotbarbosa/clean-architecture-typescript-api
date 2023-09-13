import {randomUUID} from 'crypto';

export class RandomId {
  readonly id: string;

  private constructor (id?: string) {
    this.id = id || randomUUID();
  }

  static create(id?: string) {
    return new RandomId(id);
  }
}

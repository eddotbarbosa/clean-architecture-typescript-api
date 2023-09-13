export class InvalidAgeError extends Error {
  constructor (age: number) {
    super(`invalid age: ${age}`);
    this.name = 'InvalidAgeError';
  }
}

export class CustomerNotFoundError extends Error {
  constructor () {
    super(`customer not found`);
    this.name = 'CustomerNotFoundError';
  }
}

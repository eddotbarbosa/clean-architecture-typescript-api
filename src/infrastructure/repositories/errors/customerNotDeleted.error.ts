export class CustomerNotDeletedError extends Error {
  constructor () {
    super('error on delete custoemr');
    this.name = 'CustomerNotDeletedError';
  }
}

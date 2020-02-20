import { HttpError } from '../../src/helpers';

describe('helpers.ts', () => {
  describe('HttpError', () => {
    it('should return an instance of HttpError', async () => {
      // Arrange:
      const message = 'boom!';
      
      // Act:
      const error = new HttpError(message);
  
      // Assert:
      expect(error.message).toEqual(message);
      expect(error.name).toEqual('HttpError');
      expect(error.status).toEqual(500);
    });
    it('should optionally use options as second argument', async () => {
      // Arrange:
      const message = 'boom!';
      const options = {};
      
      // Act:
      const error = new HttpError(message, options);
  
      // Assert:
      expect(error.message).toEqual(message);
      expect(error.name).toEqual('HttpError');
      expect(error.status).toEqual(500);
    });
    it('should be able merge options', async () => {
      // Arrange:
      const message = 'boom!';
      const options = { message: 'bingo' };
      
      // Act:
      const error = new HttpError(message, options);
  
      // Assert:
      expect(error.message).toEqual(options.message);
      expect(error.name).toEqual('HttpError');
      expect(error.status).toEqual(500);
    });
    it('should respect the original values of HttpError', async () => {
      // Arrange:
      const message = 'Cannot retrieve the product with id';
      const options = { reason: 'invalid id' };
      
      // Act:
      const error = new HttpError(message, options);
  
      // Assert:
      expect(error.message).toEqual(message);
      expect(error.name).toEqual('HttpError');
      expect(error.status).toEqual(500);
      expect(error.reason).toEqual(options.reason);
      expect(error.stack).toBeString();
      expect(error.stack).not.toBeEmpty();
    });
    it('should use an instance of Error as second argument', async () => {
      // Arrange:
      const original = new Error('invalid id');
      const message = 'Cannot retrieve the product with id';
      
      // Act:
      const error = new HttpError(message, original);
  
      // Assert:
      expect(error.message).toEqual(message);
      expect(error.name).toEqual('HttpError');
      expect(error.stack).toBeString();
      expect(error.stack).not.toBeEmpty();
      expect(error.status).toEqual(500);
      expect(error.reason).toEqual(original.message);
      expect(error.error).toEqual(original);
      expect(error.err).toEqual(original);
      expect(error.source).toEqual(original);
    });
  });
});
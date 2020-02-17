import { csvParser, HttpError } from '../../src/helpers';

describe('helpers.ts', () => {
  describe('csvParser', () => {
    it('should resolve when the data has been parsed', async () => {
      // Arrange:
      const expected: any = [];
      const csv = jest.fn((files, options, cb) => cb(null, expected));

      // Act:
      const fn = csvParser(csv);
      const result = await fn('', {});

      // Assert:
      expect(csv).toBeCalledTimes(1);
      expect(result).toEqual(expected);
    });
    it('should reject when the data could not be parsed', () => {
      // Arrange:
      const expected = new Error('Boom!');
      const csv = jest.fn((files, options, cb) => cb(expected, null));

      // Act:
      const result = csvParser(csv)('', {});

      // Assert:
      result.catch((error: any) => {
        expect(error.reason).toEqual(expected.message);
        expect(csv).toBeCalledTimes(1);
      });
    });
    it('should reject when throw error', () => {
      // Arrange:
      const expected = new Error('Boom!');
      const csv = jest.fn((files, options, cb) => { throw expected; });

      // Act:
      const result = csvParser(csv)('', {});

      // Assert:
      result.catch((error: any) => {
        expect(error.reason).toEqual(expected.message);
        expect(csv).toBeCalledTimes(1);
      });
    });
  });

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
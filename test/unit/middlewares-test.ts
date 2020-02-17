import { error, notAllowed, notFound } from '../../src/middlewares';

describe('middleware.ts', () => {
  describe('notFound', () => {
    it('should throw error "Not found."', async () => {
      // Arrange:
      const req = {} as any;
      const res = {} as any;
      const next = () => {};
      
      // Act:
      const result = () => notFound(req, res, next);

      // Assert:
      expect(result).toThrowError('Not found.');
    });
  });

  describe('notAllowed', () => {
    it('should throw error "Method not allowed."', async () => {
      // Arrange:
      const req = {} as any;
      const res = {} as any;
      const next = () => {};
      
      // Act:
      const result = () => notAllowed(req, res, next);

      // Assert:
      expect(result).toThrowError('Method Not allowed.');
    });
  });

  describe('error', () => {
    it('should call res.json with the error message', async () => {
      // Arrange:
      const err = new Error('Boom!');
      const req = {} as any;
      const res = { json: jest.fn((data: any) => {}) } as any;
      const next = () => {};
      
      // Act:
      error(err, req, res, next);

      // Assert:
      expect(res.json).toBeCalledWith({ error: 'Boom!' });
    });
  });
});
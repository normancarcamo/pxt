import { Controller } from '../../src/controller';

const service = {
  async processFile(files: any, body: any) {},
  async getProviders(query: any) {},
  async getProvider(id: string, query: any) {},
  async getProducts(query: any) {},
  async getProduct(id: string, query: any) {},
};

describe('controller.ts', () => {
  describe('processFile', () => {
    it('should res.sendStatus(200) be called in case of succeed', async () => {
      // Arrange:
      jest.spyOn(service, 'processFile').mockResolvedValue('ok' as any);
      const controller = new Controller(service as any);
      const handler = controller.processFile[0];
      const req: any = {};
      const res: any = { sendStatus: jest.fn() };
      const next: any = () => {};
  
      // Act:
      await handler(req, res, next);
  
      // Assert:
      expect(res.sendStatus).toBeCalledWith(200);
    });
    it('should next function be called in case of any error', async () => {
      // Arrange:
      const expected = new Error('Boom!');
      jest.spyOn(service, 'processFile').mockRejectedValue(expected as any);
      const controller = new Controller(service as any);
      const handler = controller.processFile[0];
      const req: any = {};
      const res: any = {};
      const next: any = jest.fn();
  
      // Act:
      await handler(req, res, next);
  
      // Assert:
      expect(next).toBeCalledWith(expected);
    });
  });

  describe('getProviders', () => {
    it('should res.json be called in case of succeed', async () => {
      // Arrange:
      jest.spyOn(service, 'getProviders').mockResolvedValue('ok' as any);
      const controller = new Controller(service as any);
      const handler = controller.getProviders[0];
      const req: any = {};
      const res: any = { json: jest.fn() };
      const next: any = () => {};
  
      // Act:
      await handler(req, res, next);
  
      // Assert:
      expect(res.json).toBeCalledWith('ok');
    });
    it('should next function be called in case of any error', async () => {
      // Arrange:
      const expected = new Error('Boom!');
      jest.spyOn(service, 'getProviders').mockRejectedValue(expected as any);
      const controller = new Controller(service as any);
      const handler = controller.getProviders[0];
      const req: any = {};
      const res: any = {};
      const next: any = jest.fn();
  
      // Act:
      await handler(req, res, next);
  
      // Assert:
      expect(next).toBeCalledWith(expected);
    });
  });

  describe('getProvider', () => {
    it('should res.json be called in case of succeed', async () => {
      // Arrange:
      jest.spyOn(service, 'getProvider').mockResolvedValue('ok' as any);
      const controller = new Controller(service as any);
      const handler = controller.getProvider[0];
      const req: any = { params: { provider: 'autofit' }, query: {} };
      const res: any = { json: jest.fn() };
      const next: any = () => {};
  
      // Act:
      await handler(req, res, next);
  
      // Assert:
      expect(res.json).toBeCalledWith('ok');
    });
    it('should next function be called in case of any error', async () => {
      // Arrange:
      const expected = new Error('Boom!');
      jest.spyOn(service, 'getProvider').mockRejectedValue(expected as any);
      const controller = new Controller(service as any);
      const handler = controller.getProvider[0];
      const req: any = { params: { provider: 'autofit' }, query: {} };
      const res: any = {};
      const next: any = jest.fn();
  
      // Act:
      await handler(req, res, next);
  
      // Assert:
      expect(next).toBeCalledWith(expected);
    });
  });

  describe('getProducts', () => {
    it('should res.json be called in case of succeed', async () => {
      // Arrange:
      jest.spyOn(service, 'getProducts').mockResolvedValue('ok' as any);
      const controller = new Controller(service as any);
      const handler = controller.getProducts[0];
      const req: any = {};
      const res: any = { json: jest.fn() };
      const next: any = () => {};
  
      // Act:
      await handler(req, res, next);
  
      // Assert:
      expect(res.json).toBeCalledWith('ok');
    });
    it('should next function be called in case of any error', async () => {
      // Arrange:
      const expected = new Error('Boom!');
      jest.spyOn(service, 'getProducts').mockRejectedValue(expected as any);
      const controller = new Controller(service as any);
      const handler = controller.getProducts[0];
      const req: any = {};
      const res: any = {};
      const next: any = jest.fn();
  
      // Act:
      await handler(req, res, next);
  
      // Assert:
      expect(next).toBeCalledWith(expected);
    });
  });

  describe('getProduct', () => {
    it('should res.json be called in case of succeed', async () => {
      // Arrange:
      jest.spyOn(service, 'getProduct').mockResolvedValue('ok' as any);
      const controller = new Controller(service as any);
      const handler = controller.getProduct[0];
      const req: any = { params: { provider: 'autofit' }, query: {} };
      const res: any = { json: jest.fn() };
      const next: any = () => {};
  
      // Act:
      await handler(req, res, next);
  
      // Assert:
      expect(res.json).toBeCalledWith('ok');
    });
    it('should next function be called in case of any error', async () => {
      // Arrange:
      const expected = new Error('Boom!');
      jest.spyOn(service, 'getProduct').mockRejectedValue(expected as any);
      const controller = new Controller(service as any);
      const handler = controller.getProduct[0];
      const req: any = { params: { provider: 'autofit' }, query: {} };
      const res: any = {};
      const next: any = jest.fn();
  
      // Act:
      await handler(req, res, next);
  
      // Assert:
      expect(next).toBeCalledWith(expected);
    });
  });

  afterEach(jest.restoreAllMocks);
});
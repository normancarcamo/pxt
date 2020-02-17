import { Service } from '../../src/service';
import { csvParser } from '../../src/helpers';
import is from '@ncardez/is';

const repository = {
  async getProviders() {},
  async getProvider() {},
  async getProducts() {},
  async getProduct() {},
  async createProducts() {}
};
const utils = {
  is, 
  csvParser: csvParser,
  csv: (files: any, options: any, callback: any): void => {}
};

describe('service.ts', () => {
  describe('processFile', () => {
    it('should throw error when files argument is invalid', () => {
      // Arrange:
      const service = new Service(repository as any, utils as any);
      const files = {};
      const body = {};

      // Act:
      const result = service.processFile(files, body);

      // Assert:
      result
        .catch((err: Error) => expect(err.message)
        .toEqual('No files were uploaded.'));
    });
    it('should throw error when files.dataset is invalid', () => {
      // Arrange:
      const service = new Service(repository as any, utils as any);
      const files = { dataset: 'autofit' };
      const body = {};

      // Act:
      const result = service.processFile(files, body);

      // Assert:
      result
        .catch((err: Error) => expect(err.message)
        .toEqual('Invalid dataset.'));
    });
    it('should throw error when body.config is invalid', () => {
      // Arrange:
      const service = new Service(repository as any, utils as any);
      const useCases = [
        {
          files: { dataset: {} },
          body: { config: '######' } // random string
        },
        {
          files: { dataset: {} },
          body: { config: '%7B%7D' } // {}
        },
        {
          files: { dataset: {} },
          body: { config: '%5B%5D' } // []
        },
      ];

      // Act:
      for (const { files, body } of useCases) {
        const result = service.processFile(files, body);
        
        // Assert:
        result
          .catch((err: Error) => expect(err.message)
          .toEqual('Invalid configuration.'));
      }
    });
    it('should throw error when body.config.provider is invalid', () => {
      // Arrange:
      const service = new Service(repository as any, utils as any);
      const useCases = [
        {
          files: { dataset: {} },
          body: { config: '%7B%22provider%22:%5B%5D%7D' }
        },
        {
          files: { dataset: {} },
          body: { config: '%7B%22provider%22:%22%22%7D' }
        },
      ];

      // Act:
      for (const { files, body } of useCases) {
        const result = service.processFile(files, body);
  
        // Assert:
        result
          .catch((err: Error) => expect(err.message)
          .toEqual('Invalid provider.'));
      }
    });
    it('should throw error when body.config.columns is invalid', () => {
      // Arrange:
      const service = new Service(repository as any, utils as any);
      const useCases = [
        {
          files: { dataset: {} },
          body: {
            config: '%7B%22provider%22:%22autofit%22,%22columns%22:%7B%7D%7D'
          }
        },
        {
          files: { dataset: {} },
          body: {
            config: '%7B%22provider%22:%22autofit%22,%22columns%22:%5B%5D%7D'
          }
        },
      ];

      // Act:
      for (const { files, body } of useCases) {
        const result = service.processFile(files, body);
  
        // Assert:
        result
          .catch((err: Error) => expect(err.message)
          .toEqual('Invalid columns.'));
      }
    });
    it('should throw error when body.config.columns is invalid', () => {
      // Arrange:
      const service = new Service(repository as any, utils as any);
      const files = { dataset: {} };
      const body = { config: '%7B%22provider%22:%22autofit%22,%22columns%22:%5B%22vin%22,%22make%22%5D%7D' };
      // Act:
      const result = service.processFile(files, body);

      // Assert:
      result
        .catch((err: Error) => expect(err.message)
        .toEqual('Invalid file.'));
    });
    it('should throw error when the csv file could not be parsed', () => {
      // Arrange:
      const expected = new Error('Boom!');
      jest.spyOn(repository, 'createProducts').mockRejectedValue(expected);
      utils.csv = (files: any, options: any, callback: any): void => {
        callback(expected, null);
      };
      const service = new Service(repository as any, utils as any);
      const files = { dataset: { data: [{ mk: 'Toyota', md: 'Camry' }] } };
      const body = { config: '%7B%22provider%22:%22autofit%22,%22columns%22:%5B%22vin%22,%22make%22%5D%7D' };

      // Act:
      const result = service.processFile(files, body);

      // Assert:
      result.catch((err: any) => expect(err.reason).toEqual(expected.message));
    });
    it('should resolve when file has been processed', async () => {
      // Arrange:
      const expected: any = 'ok';
      jest.spyOn(repository, 'createProducts').mockResolvedValue(expected);
      utils.csv = (files: any, options: any, callback: any): void => {
        callback(null, expected);
      };
      const service = new Service(repository as any, utils as any);
      const files = { dataset: { data: [{ mk: 'Toyota', md: 'Camry' }] } };
      const body = { config: '%7B%22provider%22:%22autofit%22,%22columns%22:%5B%22vin%22,%22make%22%5D%7D' };

      // Act:
      const result = await service.processFile(files, body);

      // Assert:
      expect(result).toEqual(expected);
    });
  });

  describe('getProviders', () => {
    it('should be able to resolve', async () => {
      // Arrange:
      jest.spyOn(repository, 'getProviders').mockResolvedValue('ok' as any);
      const service = new Service(repository as any, utils as any);
  
      // Act:
      const result = await service.getProviders({});
  
      // Assert:
      expect(result).toEqual('ok');
    });
    it('should be able to reject', () => {
      // Arrange:
      const expected = new Error('Boom!');
      jest.spyOn(repository, 'getProviders').mockRejectedValue(expected);
      const service = new Service(repository as any, utils as any);
  
      // Act:
      const result = service.getProviders({});
  
      // Assert:
      result.catch((error: Error) => expect(error).toEqual(expected));
    });
  });

  describe('getProvider', () => {
    it('should be able to resolve', async () => {
      // Arrange:
      jest.spyOn(repository, 'getProvider').mockResolvedValue('ok' as any);
      const service = new Service(repository as any, utils as any);
  
      // Act:
      const result = await service.getProvider('1', {});
  
      // Assert:
      expect(result).toEqual('ok');
    });
    it('should be able to reject', () => {
      // Arrange:
      const expected = new Error('Boom!');
      jest.spyOn(repository, 'getProvider').mockRejectedValue(expected);
      const service = new Service(repository as any, utils as any);
  
      // Act:
      const result = service.getProvider('1', {});
  
      // Assert:
      result.catch((error: Error) => expect(error).toEqual(expected));
    });
  });

  describe('getProducts', () => {
    it('should be able to resolve', async () => {
      // Arrange:
      jest.spyOn(repository, 'getProducts').mockResolvedValue('ok' as any);
      const service = new Service(repository as any, utils as any);
  
      // Act:
      const result = await service.getProducts({});
  
      // Assert:
      expect(result).toEqual('ok');
    });
    it('should be able to reject', () => {
      // Arrange:
      const expected = new Error('Boom!');
      jest.spyOn(repository, 'getProducts').mockRejectedValue(expected);
      const service = new Service(repository as any, utils as any);
  
      // Act:
      const result = service.getProducts({});
  
      // Assert:
      result.catch((error: Error) => expect(error).toEqual(expected));
    });
  });

  describe('getProduct', () => {
    it('should be able to resolve', async () => {
      // Arrange:
      jest.spyOn(repository, 'getProduct').mockResolvedValue('ok' as any);
      const service = new Service(repository as any, utils as any);
  
      // Act:
      const result = await service.getProduct('1', {});
  
      // Assert:
      expect(result).toEqual('ok');
    });
    it('should be able to reject', () => {
      // Arrange:
      const expected = new Error('Boom!');
      jest.spyOn(repository, 'getProduct').mockRejectedValue(expected);
      const service = new Service(repository as any, utils as any);
  
      // Act:
      const result = service.getProduct('1', {});
  
      // Assert:
      result.catch((error: Error) => expect(error).toEqual(expected));
    });
  });

  afterEach(jest.restoreAllMocks);
});
import { Repository } from '../../src/repository';
import { Database } from '../../src/db';

const db = new Database();

describe('repository.ts', () => {
  describe('getProviders', () => {
    it('should resolve when succeed', async () => {
      // Arrange:
      jest.spyOn(db, 'all').mockResolvedValue('ok' as any);
      const repository = new Repository(db);
      const queries = [
        {},
        { like: { id: 1 } },
        { orderBy: 'name' },
        { sort: 'asc' },
        { limit: 100 },
        { offset: 100 },
        { limit: 40, offset: 100 },
      ];

      for (const query of queries) {
        // Act:
        const result = await repository.getProviders(query);

        // Assert:
        expect(result).toEqual('ok');
      }
    });
    it('should resolve when fail', () => {
      // Arrange:
      jest.spyOn(db, 'all').mockImplementation(async () => {
        throw new Error('X');
      });
      const repository = new Repository(db);
      
      // Act:
      const result = repository.getProviders({});

      // Assert:
      result.catch((err: any) => expect(err.reason).toEqual('X'));
    });
  });

  describe('getProvider', () => {
    it('should resolve when succeed', async () => {
      // Arrange:
      const payload = [
        { id: '1', options: {} },
        { id: '2', options: { columns: '' } },
        { id: '2', options: { columns: 'id,name' } },
      ];
      const expected = 'ok';
      jest.spyOn(db, 'get').mockResolvedValue(expected);
      const repository = new Repository(db);

      for (const { id, options } of payload) {
        // Act:
        const result = await repository.getProvider(id, options);
  
        // Assert:
        expect(result).toEqual(expected);
      }
    });
    it('should resolve when fail', () => {
      // Arrange:
      jest.spyOn(db, 'get').mockImplementation(async () => {
        throw new Error('X');
      });
      const repository = new Repository(db);
      
      // Act:
      const result = repository.getProvider('1', {});

      // Assert:
      return result.catch((err: any) => expect(err.reason).toEqual('X'));
    });
  });

  describe('getProviderByName', () => {
    it('should resolve when succeed', async () => {
      // Arrange:
      jest.spyOn(db, 'get').mockResolvedValue('ok' as any);
      const repository = new Repository(db);
      
      // Act:
      const result = await repository.getProviderByName('autofit');

      // Assert:
      expect(result).toEqual('ok');
    });
    it('should resolve when fail', () => {
      // Arrange:
      jest.spyOn(db, 'get').mockImplementation(async () => {
        throw new Error('X');
      });
      const repository = new Repository(db);
      
      // Act:
      const result = repository.getProviderByName('autofit');

      // Assert:
      return result.catch((err: any) => expect(err.reason).toEqual('X'));
    });
  });

  describe('createProvider', () => {
    it('should resolve when succeed', async () => {
      // Arrange:
      jest.spyOn(db, 'run').mockResolvedValue('ok' as any);
      const repository = new Repository(db);
      
      // Act:
      const result = await repository.createProvider({ provider: 'autofit' });

      // Assert:
      expect(result).toEqual('ok');
    });
    it('should resolve when fail', () => {
      // Arrange:
      jest.spyOn(db, 'run').mockImplementation(async () => {
        throw new Error('X');
      });
      const repository = new Repository(db);
      
      // Act:
      const result = repository.createProvider({ provider: 'autofit' });

      // Assert:
      return result.catch((err: any) => expect(err.reason).toEqual('X'));
    });
  });

  describe('getProducts', () => {
    it('should resolve when succeed', async () => {
      // Arrange:
      jest.spyOn(db, 'all').mockResolvedValue('ok' as any);
      const repository = new Repository(db);
      const queries = [
        {},
        { like: { id: 1 } },
        { orderBy: 'name' },
        { sort: 'asc' },
        { limit: 100 },
        { offset: 100 },
        { limit: 40, offset: 100 },
      ];

      for (const query of queries) {
        // Act:
        const result = await repository.getProducts(query);

        // Assert:
        expect(result).toEqual('ok');
      }
    });
    it('should resolve when fail', () => {
      // Arrange:
      jest.spyOn(db, 'all').mockImplementation(async () => {
        throw new Error('X');
      });
      const repository = new Repository(db);
      
      // Act:
      const result = repository.getProducts({});

      // Assert:
      result.catch((err: any) => expect(err.reason).toEqual('X'));
    });
  });

  describe('getProduct', () => {
    it('should resolve when succeed', async () => {
      // Arrange:
      const payload = [
        { id: '1', options: {} },
        { id: '2', options: { columns: '' } },
        { id: '2', options: { columns: 'id,name' } },
      ];
      const expected = 'ok';
      jest.spyOn(db, 'get').mockResolvedValue(expected);
      const repository = new Repository(db);

      for (const { id, options } of payload) {
        // Act:
        const result = await repository.getProduct(id, options);
  
        // Assert:
        expect(result).toEqual(expected);
      }
    });
    it('should resolve when fail', () => {
      // Arrange:
      jest.spyOn(db, 'get').mockImplementation(async () => {
        throw new Error('X');
      });
      const repository = new Repository(db);
      
      // Act:
      const result = repository.getProduct('1', {});

      // Assert:
      return result.catch((err: any) => expect(err.reason).toEqual('X'));
    });
  });

  describe('getProductColumns', () => {
    it('should resolve when succeed', async () => {
      // Arrange:
      jest.spyOn(db, 'all').mockResolvedValue('ok' as any);
      const repository = new Repository(db);
      
      // Act:
      const result = await repository.getProductColumns();

      // Assert:
      expect(result).toEqual('ok');
    });
    it('should resolve when fail', () => {
      // Arrange:
      jest.spyOn(db, 'all').mockRejectedValue(new Error('X') as any);
      const repository = new Repository(db);
      
      // Act:
      const result = repository.getProductColumns();

      // Assert:
      return result.catch((err: any) => expect(err.reason).toEqual('X'));
    });
  });

  describe('addProductColumn', () => {
    it('should resolve when succeed', async () => {
      // Arrange:
      jest.spyOn(db, 'run').mockResolvedValue('ok' as any);
      const repository = new Repository(db);
      
      // Act:
      const result = await repository.addProductColumn('make');

      // Assert:
      expect(result).toEqual('ok');
    });
    it('should resolve when fail', () => {
      // Arrange:
      jest.spyOn(db, 'run').mockRejectedValue(new Error('X') as any);
      const repository = new Repository(db);
      
      // Act:
      const result = repository.addProductColumn('make');

      // Assert:
      return result.catch((err: any) => expect(err.reason).toEqual('X'));
    });
  });

  describe('createProducts', () => {
    it('should reject when config is empty', async () => {
      // Arrange:
      const repository = new Repository(db);
      const config: any = {};
      const data = [{ make: 'Toyota', model: 'Camry' }];
      
      // Act:
      const result = repository.createProducts(config, data);

      // Assert:
      return result
        .catch((err: Error) => expect(err.message)
        .toEqual('config cannot be empty.'));
    });
    it('should reject when data is empty', async () => {
      // Arrange:
      const repository = new Repository(db);
      const config = { provider: 'autofit', columns: [ 'make', 'model' ] };
      const data: any = [];
      
      // Act:
      const result = repository.createProducts(config, data);

      // Assert:
      return result
        .catch((err: Error) => expect(err.message)
        .toEqual('data cannot be empty.'));
    });
    it('should reject inserting the products', async () => {
      // Arrange:
      const repository = new Repository(db);
      const config: any = { provider: 'autofit', columns: [ 'mk', 'md' ] };
      const data = [{ mk: 'Toyota', md: 'Camry' }];
      const columns = [{ id: 1, name: 'id' }, { id: 2, name: 'vin' }];
      const expected = new Error('Boom!');
      jest.spyOn(repository, 'getProviderByName').mockResolvedValue('autofit');
      jest.spyOn(repository, 'createProvider').mockResolvedValue(config);
      jest.spyOn(repository, 'getProductColumns').mockResolvedValue(columns);
      jest.spyOn(repository, 'addProductColumn').mockResolvedValue(undefined);
      jest.spyOn(db, 'run').mockRejectedValue(expected);
      
      // Act:
      const result = repository.createProducts(config, data);

      // Assert:
      return result.catch((err: any) => {
        expect(err.reason).toEqual(expected.message);
      });
    });
    it('should resolve in happy path 1', async () => {
      // Arrange:
      const repository = new Repository(db);
      const config: any = { provider: 'autofit', columns: [ 'mk', 'md' ] };
      const data = [{ mk: 'Toyota', md: 'Camry' }];
      const columns = [{ id: 1, name: 'id' }, { id: 2, name: 'vin' }];
      jest.spyOn(repository, 'getProviderByName').mockResolvedValue('autofit');
      jest.spyOn(repository, 'createProvider').mockResolvedValue(config);
      jest.spyOn(repository, 'getProductColumns').mockResolvedValue(columns);
      jest.spyOn(repository, 'addProductColumn').mockResolvedValue(undefined);
      jest.spyOn(db, 'run').mockResolvedValue('ok' as any);
      
      // Act:
      const result = await repository.createProducts(config, data);

      // Assert:
      expect(result).toEqual('ok');
    });
    it('should resolve in happy path 2', async () => {
      // Arrange:
      const repository = new Repository(db);
      const config: any = { provider: 'autofit', columns: [ 'mk', 'md' ] };
      const data = [{ mk: 'Toyota', md: 'Camry' }];
      const columns = [{ id: 1, name: 'id' }, { id: 2, name: 'vin' }];

      jest.spyOn(repository, 'getProviderByName')
        .mockResolvedValueOnce(undefined)
        .mockResolvedValueOnce(config.provider);
      jest.spyOn(repository, 'createProvider').mockResolvedValue('ok');
      jest.spyOn(repository, 'getProductColumns').mockResolvedValue(columns);
      jest.spyOn(repository, 'addProductColumn').mockResolvedValue(undefined);
      jest.spyOn(db, 'run').mockResolvedValue('ok' as any);
      
      // Act:
      const result = await repository.createProducts(config, data);

      // Assert:
      expect(result).toEqual('ok');
    });
  });

  afterEach(jest.resetAllMocks);
  afterEach(jest.restoreAllMocks);
});
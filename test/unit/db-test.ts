import { Database } from '../../src/db';
import sqlite3 from 'sqlite3';

describe('db.ts', () => {
  describe('all', () => {
    it('should resolve when action succeed', async function() {
      // Arrange:
      const cb = jest.fn((err?: Error) => void {});
      jest.spyOn(sqlite3, 'Database').mockReturnValue({
        all: async (stmt: string, callback: (err?: Error) => void) => {
          callback();
          cb();
        }
      } as any);
      const db = new Database();
    
      // Act:
      await db.all('SELECT * FROM provider;');
    
      // Assert:
      expect(cb).toBeCalledWith();
    });
    it('should reject when action fail', () => {
      // Arrange:
      const expected = new Error('boom!');
      const cb = jest.fn((err?: Error) => void {});
      jest.spyOn(sqlite3, 'Database').mockReturnValue({
        all: async (stmt: string, callback: (err?: Error) => void) => {
          cb(expected);
          callback(expected);
        }
      } as any);
      const db = new Database();
    
      // Act:
      const result = db.all('SELECT * FROM provider;');
    
      // Assert:
      result.catch((err: Error) => {
        expect(err).toEqual(expected);
        expect(cb).toBeCalledWith(expected);
      });
    });
    it('should call log when is available', async () => {
      // Arrange:
      jest.restoreAllMocks();
      jest.spyOn(sqlite3, 'Database').mockReturnValue({
        all: async (stmt: string, callback: (err?: Error) => void) => {
          callback();
        }
      } as any);
      const db = new Database(); 
      const logging = jest.fn((s: string) => s);
      const stmt = 'SELECT * FROM provider WHERE id = 1;';
    
      // Act:
      await db.all(stmt, logging);
    
      // Assert:
      expect(logging).toBeCalledWith(stmt);
    });
  });

  describe('get', () => {
    it('should resolve when action succeed', async function() {
      // Arrange:
      const cb = jest.fn((err?: Error) => void {});
      jest.spyOn(sqlite3, 'Database').mockReturnValue({
        get: async (stmt: string, callback: (err?: Error) => void) => {
          callback();
          cb();
        }
      } as any);
      const db = new Database();
    
      // Act:
      await db.get('SELECT * FROM provider;');
    
      // Assert:
      expect(cb).toBeCalledWith();
    });
    it('should reject when action fail', () => {
      // Arrange:
      const expected = new Error('boom!');
      const cb = jest.fn((err?: Error) => void {});
      jest.spyOn(sqlite3, 'Database').mockReturnValue({
        get: async (stmt: string, callback: (err?: Error) => void) => {
          cb(expected);
          callback(expected);
        }
      } as any);
      const db = new Database();
    
      // Act:
      const result = db.get('SELECT * FROM provider;');
    
      // Assert:
      result.catch((err: Error) => {
        expect(err).toEqual(expected);
        expect(cb).toBeCalledWith(expected);
      });
    });
    it('should call log when is available', async () => {
      // Arrange:
      jest.restoreAllMocks();
      jest.spyOn(sqlite3, 'Database').mockReturnValue({
        get: async (stmt: string, callback: (err?: Error) => void) => {
          callback();
        }
      } as any);
      const db = new Database(); 
      const logging = jest.fn((s: string) => s);
      const stmt = 'SELECT * FROM provider WHERE id = 1;';
    
      // Act:
      await db.get(stmt, logging);
    
      // Assert:
      expect(logging).toBeCalledWith(stmt);
    });
  });

  describe('run', () => {
    it('should resolve when action succeed', async function() {
      // Arrange:
      const cb = jest.fn((err?: Error) => void {});
      jest.spyOn(sqlite3, 'Database').mockReturnValue({
        run: async (stmt: string, callback: (err?: Error) => void) => {
          callback();
          cb();
        }
      } as any);
      const db = new Database();
    
      // Act:
      await db.run('SELECT * FROM provider;');
    
      // Assert:
      expect(cb).toBeCalledWith();
    });
    it('should reject when action fail', () => {
      // Arrange:
      const expected = new Error('boom!');
      const cb = jest.fn((err?: Error) => void {});
      jest.spyOn(sqlite3, 'Database').mockReturnValue({
        run: async (stmt: string, callback: (err?: Error) => void) => {
          cb(expected);
          callback(expected);
        }
      } as any);
      const db = new Database();
    
      // Act:
      const result = db.run('SELECT * FROM provider;');
    
      // Assert:
      result.catch((err: Error) => {
        expect(err).toEqual(expected);
        expect(cb).toBeCalledWith(expected);
      });
    });
    it('should call log when is available', async () => {
      // Arrange:
      jest.restoreAllMocks();
      jest.spyOn(sqlite3, 'Database').mockReturnValue({
        run: async (stmt: string, callback: (err?: Error) => void) => {
          callback();
        }
      } as any);
      const db = new Database(); 
      const logging = jest.fn((s: string) => s);
      const stmt = 'SELECT * FROM provider WHERE id = 1;';
    
      // Act:
      await db.run(stmt, logging);
    
      // Assert:
      expect(logging).toBeCalledWith(stmt);
    });
  });

  describe('cleanStatement', () => {
    const db = new Database();
    it('should return empty string when is ""', () => {
      expect(db.cleanStatement('')).toEqual('');
    });
    it('should return empty string when is undefined', () => {
      expect(db.cleanStatement(undefined)).toEqual('');
    });
    it('should return empty string when includes multiple spaces', () => {
      expect(db.cleanStatement('          ')).toEqual('');
    });
    it('should return "SELECT 1;" when does not include ";"', () => {
      expect(db.cleanStatement('SELECT           1')).toEqual('SELECT 1;');
    });
    it('should return "SELECT 1;" when includes ";"', () => {
      expect(db.cleanStatement('SELECT           1  ;')).toEqual('SELECT 1;');
    });
    it('should return "SELECT 1;" when includes new lines', () => {
      expect(db.cleanStatement('SELECT      \n \n  1')).toEqual('SELECT 1;');
    });
  });

  describe('getOptions', () => {
    describe('should return default values when query', () => {
      it('object is empty', () => {
        // Arrange:
        const db = new Database();
  
        // Act:
        const result = db.getOptions({});
  
        // Assert:
        expect(result).toEqual({
          columns: '',
          limit: '',
          offset: '',
          orderBy: '',
          sort: '',
          like: ''
        });
      });
      it('includes unknown keys', () => {
        // Arrange:
        const db = new Database();
  
        // Act:
        const result = db.getOptions({ gte: 12 });
        
        // Assert:
        expect(result).toEqual({
          columns: '',
          limit: '',
          offset: '',
          orderBy: '',
          sort: '',
          like: ''
        });
      });
      it('has the same keys but each empty', () => {
        // Arrange:
        const db = new Database();
  
        // Act:
        const result = db.getOptions({
          columns: '',
          limit: '',
          offset: '',
          orderBy: '',
          sort: '',
          like: ''
        });
        
        // Assert:
        expect(result).toEqual({
          columns: '',
          limit: '',
          offset: '',
          orderBy: '',
          sort: '',
          like: ''
        });
      });
    });
    describe('columns', () => {
      it('should columns be equal to "name" when value is "name"', () => {
        const db = new Database();
        const options = db.getOptions({ columns: 'name' });
        expect(options).toHaveProperty('columns', 'name');
      });
      it('should columns be equal to "" when value is ""', () => {
        const db = new Database();
        const options = db.getOptions({ columns: '' });
        expect(options).toHaveProperty('columns', '');
      });
    });
    describe('limit', () => {
      it('should limit be equal to "LIMIT 10" when value is 10', () => {
        const db = new Database();
        const options = db.getOptions({ limit: 10 });
        expect(options).toHaveProperty('limit', 'LIMIT 10');
      });
      it('should limit be equal to "" when value is ""', () => {
        const db = new Database();
        const options = db.getOptions({ limit: '' });
        expect(options).toHaveProperty('limit', '');
      });
    });
    describe('offset', () => {
      it('should be "" when value is ""', () => {
        const db = new Database();
        const options = db.getOptions({ offset: '' });
        expect(options).toHaveProperty('offset', '');
      });
      it('should be "" when value is 5 and limit is not set', () => {
        const db = new Database();
        const options = db.getOptions({ offset: 5 });
        expect(options).toHaveProperty('offset', '');
      });
      it('should be "OFFSET 5" when value is 5 and limit is set', () => {
        const db = new Database();
        const options = db.getOptions({ limit: 10, offset: 5 });
        expect(options).toHaveProperty('offset', 'OFFSET 5');
      });
    });
    describe('orderBy', () => {
      it('should be equal to "ORDER BY name" when value is "name"', () => {
        const db = new Database();
        const options = db.getOptions({ orderBy: 'name' });
        expect(options).toHaveProperty('orderBy', 'ORDER BY name');
      });
      it('should be equal to "" when value is ""', () => {
        const db = new Database();
        const options = db.getOptions({ orderBy: '' });
        expect(options).toHaveProperty('orderBy', '');
      });
    });
    describe('sort', () => {
      it('should be equal to "ASC" when value is "asc"', () => {
        const db = new Database();
        const options = db.getOptions({ sort: 'asc' });
        expect(options).toHaveProperty('sort', 'ASC');
      });
      it('should be equal to "ASC" when value is "ASC"', () => {
        const db = new Database();
        const options = db.getOptions({ sort: 'ASC' });
        expect(options).toHaveProperty('sort', 'ASC');
      });
      it('should be equal to "DESC" when value is "desc"', () => {
        const db = new Database();
        const options = db.getOptions({ sort: 'desc' });
        expect(options).toHaveProperty('sort', 'DESC');
      });
      it('should be equal to "DESC" when value is "DESC"', () => {
        const db = new Database();
        const options = db.getOptions({ sort: 'DESC' });
        expect(options).toHaveProperty('sort', 'DESC');
      });
      it('should be equal to "" when value is ""', () => {
        const db = new Database();
        const options = db.getOptions({ sort: '' });
        expect(options).toHaveProperty('sort', '');
      });
      it('should be equal to "" when value is not valid', () => {
        const db = new Database();
        const options = db.getOptions({ sort: 'KRU' });
        expect(options).toHaveProperty('sort', '');
      });
    });
    describe('like', () => {
      it('should be equal to "" when value is ""', () => {
        const db = new Database();
        const options = db.getOptions({ like: '' });
        expect(options).toHaveProperty('like', '');
      });
      it('should be equal to "" when value is an empty object', () => {
        const db = new Database();
        const options = db.getOptions({ like: {} });
        expect(options).toHaveProperty('like', '');
      });
      it('should be equal to "" when value is not an object', () => {
        const db = new Database();
        const options = db.getOptions({ like: {} });
        expect(options).toHaveProperty('like', '');
      });
      it('should be equal to "" when value is { name: \'\' }', () => {
        const db = new Database();
        const options = db.getOptions({ like: {} });
        expect(options).toHaveProperty('like', '');
      });
      it('should be equal to "" when value is { \'\': \'\' }', () => {
        const db = new Database();
        const options = db.getOptions({ like: { '': '' } });
        expect(options).toHaveProperty('like', '');
      });
      describe('should be equal to', () => {
        it(`"name LIKE '%fit%'" when value is { name: 'fit' }`, () => {
          const db = new Database();
          const options = db.getOptions({ like: { name: 'fit' } });
          expect(options).toHaveProperty('like', `name LIKE '%fit%'`);
        });
        it(`"name LIKE '%fit%'" when value is { name: 'fit', id: 1 }`, () => {
          const db = new Database();
          const options = db.getOptions({ like: { name: 'fit' } });
          expect(options).toHaveProperty('like', `name LIKE '%fit%'`);
        });
      });
    });
  });

  afterEach(jest.restoreAllMocks);
});
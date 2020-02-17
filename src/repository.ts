import { IConfig, IDatabase } from './types';
import { HttpError } from './helpers';

export class Repository {
  private db: IDatabase;

  constructor(db: IDatabase) {
    this.db = db;
  }

  async getProviders(query: any) {
    try {
      const options = this.db.getOptions(query);
      const stmt = `
        SELECT * 
        FROM provider 
        ${options.like ? `WHERE ${options.like}` : ''}
        ${options.orderBy ? options.orderBy : ''}
        ${options.sort ? options.sort : ''}
        ${options.limit ? options.limit : ''}
        ${options.offset ? options.offset : ''}
      `;
      const result = await this.db.all(stmt);
      return result;
    } catch (err) {
      throw new HttpError(`Could not get the providers.`, err);
    }
  }

  async getProvider(id: string, query: any) {
    try {
      const options = this.db.getOptions(query);
      const stmt = `
        SELECT ${options.columns ? options.columns : '*'}
        FROM provider 
        WHERE id = '${id}'
      `;
      const result = await this.db.get(stmt);;
      return result;
    } catch (err) {
      throw new HttpError(`Could not get the provider with id: ${id}.`, err);
    }
  }

  async getProviderByName(name: string) {
    try {
      const stmt = `SELECT * FROM provider WHERE name = '${name}'`;
      const result = await this.db.get(stmt);
      return result;
    } catch (err) {
      throw new HttpError(`Could not get the provider with: ${name}.`, err);
    }
  }

  async createProvider(data: any) {
    try {
      const name: string = data.provider;
      const stmt = `INSERT INTO provider (name) VALUES ('${name}')`;
      const result = await this.db.run(stmt);;
      return result;
    } catch (err) {
      throw new HttpError(`Could not create the provider.`, err);
    }
  }

  async getProducts(query: any) {
    try {
      const options = this.db.getOptions(query);
      const stmt = `
        SELECT * 
        FROM product 
        ${options.like ? `WHERE ${options.like}` : ''}
        ${options.orderBy ? options.orderBy : ''}
        ${options.sort ? options.sort : ''}
        ${options.limit ? options.limit : ''}
        ${options.offset ? options.offset : ''}
      `;
      const result = await this.db.all(stmt);;
      return result;
    } catch (err) {
      throw new HttpError(`Could not get the products.`, err);
    }
  }

  async getProduct(id: string, query: any) {
    try {
      const options = this.db.getOptions(query);
      const stmt = `
        SELECT ${options.columns ? options.columns : '*'}
        FROM product 
        WHERE id = '${id}'
      `;
      const result = await this.db.get(stmt);
      return result;
    } catch (err) {
      throw new HttpError(`Could not get the product with id.`, err);
    }
  }

  async getProductColumns() {
    try {
      const stmt = `PRAGMA table_info('product')`;
      const result = await this.db.all(stmt);;
      return result;
    } catch (err) {
      throw new HttpError(`Could not get the columns of the product.`, err);
    }
  }

  async addProductColumn(name: string) {
    try {
      const stmt = `ALTER TABLE product ADD COLUMN ${name} TEXT;`;
      const result = await this.db.run(stmt);
      return result;
    } catch (err) {
      throw new HttpError(`Could not add the column "${name}".`, err);
    }
  }

  async createProducts(config: IConfig, data: any[]) {
    if (Object.keys(config).length === 0) {
      throw new Error('config cannot be empty.');
    }

    if (data.length === 0) {
      throw new Error('data cannot be empty.');
    }

    let provider = await this.getProviderByName(config.provider);

    if (!provider) {
      await this.createProvider(config);
      provider = await this.getProviderByName(config.provider);
    }
  
    const productColumns = await this.getProductColumns();

    const current = (productColumns as any[]).map((column) => column.name);

    const columns = config.columns.filter((c: string) => !current.includes(c));
    
    await Promise.all(columns.map(col => this.addProductColumn(col)));
    
    const fields: string = config.columns.toString();

    const values: string = data.map((row: any) => {
      const list: string[] = [];
      for (const column of config.columns) {
        list.push(`'${row[column]}'`);
      }
      return `('${provider.id}',${list.toString()})`;
    }).join(',');

    try {
      const stmt = `
        INSERT INTO product (id_provider,${fields}) 
        VALUES ${values}`;
      const result = await this.db.run(stmt);
      return result;
    } catch (err) {
      throw new HttpError(`Could not create the products.`, err);
    }
  }
}
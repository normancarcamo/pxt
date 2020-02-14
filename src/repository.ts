import { Connection } from './db';
import { IConfig } from './types';

export class Repository {
  private db: Connection;

  constructor(db: Connection) {
    this.db = db;
    this.getProviders = this.getProviders.bind(this);
    this.getProvider = this.getProvider.bind(this);
    this.getProviderByName = this.getProviderByName.bind(this);
    this.createProvider = this.createProvider.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.getProduct = this.getProduct.bind(this);
    this.getProductColumns = this.getProductColumns.bind(this);
    this.addProductColumn = this.addProductColumn.bind(this);
    this.createProducts = this.createProducts.bind(this);
  }

  async getProviders(query: any) {
    const options = this.db.getOptions(query);
    return this.db.all(`
      SELECT * 
      FROM provider 
      ${options.like ? `WHERE ${options.like}` : ''}
      ${options.orderBy ? options.orderBy : ''}
      ${options.sortBy ? options.sortBy : ''}
      ${options.limit ? options.limit : ''}
      ${options.offset ? options.offset : ''}
    `);
  }

  async getProvider(id: string, query: any) {
    const options = this.db.getOptions(query);
    return this.db.get(`
      SELECT ${options.columns ? options.columns : '*'}
      FROM provider 
      WHERE id = '${id}'
    `);
  }

  async getProviderByName(name: string) {
    return await this.db.get(`SELECT * FROM provider WHERE name = '${name}'`);
  }

  async createProvider(data: any) {
    const name: string = data.provider;
    return await this.db.run(`INSERT INTO provider (name) VALUES ('${name}')`);
  }

  async getProducts(query: any) {
    const options = this.db.getOptions(query);
    return this.db.all(`
      SELECT * 
      FROM product 
      ${options.like ? `WHERE ${options.like}` : ''}
      ${options.orderBy ? options.orderBy : ''}
      ${options.sortBy ? options.sortBy : ''}
      ${options.limit ? options.limit : ''}
      ${options.offset ? options.offset : ''}
    `);
  }

  async getProduct(id: string, query: any) {
    const options = this.db.getOptions(query);
    return this.db.get(`
      SELECT ${options.columns ? options.columns : '*'}
      FROM product 
      WHERE id = '${id}'
    `);
  }

  async getProductColumns() {
    return await this.db.all(`PRAGMA table_info('product')`);
  }

  async addProductColumn(name: string) {
    return await this.db.run(`ALTER TABLE product ADD COLUMN ${name} TEXT;`);
  }

  async createProducts(config: IConfig, data: any) {
    let provider = await this.getProviderByName(config.provider);
  
    if (!provider) {
      await this.createProvider(config);
      provider = await this.getProviderByName(config.provider);
    }
  
    const info = await this.getProductColumns();
    
    const currentColumns = info.map((column) => column.name);
  
    const newColumns = config.columns
      .filter((c) => !currentColumns.includes(c));
  
    await Promise.all(newColumns.map(col => this.addProductColumn(col)));
  
    const fields: string = config.columns.toString();
  
    const values: string = data.map((row: any) => {
      const list: string[] = [];
      for (const column of config.columns) {
        list.push(`'${row[column]}'`);
      }
      return `('${provider.id}',${list.toString()})`;
    }).join(',');
  
    await this.db.run(`
      INSERT INTO product (id_provider,${fields}) 
      VALUES ${values}
    `);
  }
}
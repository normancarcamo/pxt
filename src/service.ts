import { IUploadedFile, IRepository, IUtil } from './types';

export class Service {
  private repository: IRepository;
  private util: IUtil;

  constructor(repository: IRepository, util: IUtil) {
    this.repository = repository;
    this.util = util;
  }

  async processFile(files: any, config: any) {
    // 1. VALIDATE INPUT:
    if (!files || Object.keys(files).length === 0) {
      throw new Error('No files were uploaded.');
    }
  
    if (!this.util.is.object(files.dataset)) {
      throw new Error('Invalid dataset.');
    }
   
    if (this.util.is.empty(config)) {
      throw new Error('Invalid configuration.');
    }
  
    if (!this.util.is.string(config.provider) || 
      this.util.is.empty(config.provider)) {
      throw new Error('Invalid provider.');
    }

    if (!this.util.is.string(config.columns) || 
      this.util.is.empty(config.columns)) {
      throw new Error('Invalid columns.');
    
    }
    config.columns = config.columns.split(',');
  
    // 2. PARSE DATA:
    const csv = this.util.csvParser(this.util.csv);
    const data = await csv(
      (files.dataset as IUploadedFile).data, 
      { columns: config.columns }
    );
  
    // 3. INSERT DATA:
    const result = await this.repository.createProducts(config, data);

    return result;
  }

  async getProviders(query: any) {
    return await this.repository.getProviders(query);
  }
  
  async getProvider(id: string, query: any) {
    return await this.repository.getProvider(id, query);
  }
  
  async getProducts(query: any) {
    return await this.repository.getProducts(query);
  }
  
  async getProduct(id: string, query: any) {
    return await this.repository.getProduct(id, query);
  }
}
import { IUploadedFile, IRepository, IUtil } from './types';

export class Service {
  private repository: IRepository;
  private util: IUtil;

  constructor(repository: IRepository, util: IUtil) {
    this.repository = repository;
    this.util = util;
    this.processFile = this.processFile.bind(this);
    this.getProviders = this.getProviders.bind(this);
    this.getProvider = this.getProvider.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.getProduct = this.getProduct.bind(this);
  }

  async processFile(files: any, body: any) {
    // 1. VALIDATE INPUT:
    let config : { columns: string[]; provider: string; };
  
    if (!files || Object.keys(files).length === 0) {
      throw new Error('No files were uploaded.');
    }
  
    if (!this.util.is.object(files.dataset)) {
      throw new Error('Invalid dataset.');
    }
  
    try {
      config = JSON.parse(decodeURI(body.config));
    } catch (err) {
      throw new Error('Invalid configuration.');
    }
  
    if (!this.util.is.object(config) || this.util.is.empty(config)) {
      throw new Error('Invalid configuration.');
    }
  
    if (!this.util.is.string(config.provider) || 
      this.util.is.empty(config.provider)) {
      throw new Error('Invalid provider.');
    }
  
    if (!this.util.is.array(config.columns) || 
      this.util.is.empty(config.columns)) {
      throw new Error('Invalid columns.');
    }
  
    // 2. PARSE DATA:
    let data = null;
    try {
      data = await this.util.parseCSV(
        (files.dataset as IUploadedFile).data, 
        { columns: config.columns }
      );
    } catch (err) {
      throw new Error('Invalid file.');
    }
  
    // 3. INSERT DATA:
    await this.repository.createProducts(config, data);
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
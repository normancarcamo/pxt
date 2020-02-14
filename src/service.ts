import { UploadedFile } from 'express-fileupload';
import is from '@ncardez/is';
import * as util from './utils';
import { Repository } from './repository';

export class Service {
  private repository: Repository;

  constructor(repository: Repository) {
    this.repository = repository;
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
  
    if (!is.object(files.dataset)) {
      throw new Error('Invalid dataset.');
    }
  
    try {
      config = JSON.parse(decodeURI(body.config));
    } catch (err) {
      throw new Error('Invalid configuration.');
    }
  
    if (!is.object(config) || is.empty(config)) {
      throw new Error('Invalid configuration.');
    }
  
    if (!is.string(config.provider) || is.empty(config.provider)) {
      throw new Error('Invalid provider.');
    }
  
    if (!is.array(config.columns) || is.empty(config.columns)) {
      throw new Error('Invalid columns.');
    }
  
    // 2. PARSE DATA:
    const dataset = files.dataset as UploadedFile;
  
    const data = await util.parseCSV(dataset.data, { columns: config.columns });
  
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
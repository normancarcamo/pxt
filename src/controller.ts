import { IRequest, IResponse, INext, IService } from './types';

export class Controller {
  private service: IService;

  constructor(service: IService) {
    this.service = service;
    this.processFile = this.processFile.bind(this);
    this.getProviders = this.getProviders.bind(this);
    this.getProvider = this.getProviders.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.getProduct = this.getProduct.bind(this);
  }

  async processFile(req: IRequest, res: IResponse, next: INext) {
    return this.service.processFile(req.files, req.body)
      .then(() => res.sendStatus(200))
      .catch(error => next(error));
  }
  
  async getProviders(req: IRequest, res: IResponse, next: INext) {
    return this.service.getProviders(req.query)
      .then((result: any) => res.json(result))
      .catch(error => next(error));
  }
  
  async getProvider(req: IRequest, res: IResponse, next: INext) {
    return this.service.getProvider(req.params.provider, req.query)
      .then((result: any) => res.json(result))
      .catch(error => next(error));
  }
  
  async getProducts(req: IRequest, res: IResponse, next: INext) {
    return this.service.getProducts(req.query)
      .then((result: any) => res.json(result))
      .catch(error => next(error));
  }
  
  async getProduct(req: IRequest, res: IResponse, next: INext) {
    return this.service.getProduct(req.params.product, req.query)
      .then((result: any) => res.json(result))
      .catch(error => next(error));
  }
}
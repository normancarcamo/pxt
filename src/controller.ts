import { IRequest, IResponse, INext, IService } from './types';

export class Controller {
  private service: IService;

  constructor(service: IService) {
    this.service = service;
  }

  processFile = [
    async (req: IRequest, res: IResponse, next: INext) => {
      return this.service.processFile(req.files, req.body)
        .then(() => res.sendStatus(200))
        .catch(error => next(error));
    }
  ]
  
  getProviders = [
    async (req: IRequest, res: IResponse, next: INext) => {
      return this.service.getProviders(req.query)
        .then((result: any) => res.json(result))
        .catch(error => next(error));
    }
  ]
  
  getProvider = [
    async (req: IRequest, res: IResponse, next: INext) => {
      return this.service.getProvider(req.params.provider, req.query)
        .then((result: any) => res.json(result))
        .catch(error => next(error));
    }
  ]
  
  getProducts = [
    async (req: IRequest, res: IResponse, next: INext) => {
      return this.service.getProducts(req.query)
        .then((result: any) => res.json(result))
        .catch(error => next(error));
    }
  ]
  
  getProduct = [
    async (req: IRequest, res: IResponse, next: INext) => {
      return this.service.getProduct(req.params.product, req.query)
        .then((result: any) => res.json(result))
        .catch(error => next(error));
    }
  ]
}
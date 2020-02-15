import { IRequest, IResponse, INext, IService } from './types';

export class Controller {
  private service: IService;

  constructor(service: IService) {
    this.service = service;
  }

  processFile = [
    (req: IRequest, res: IResponse, next: INext) => {
      this.service.processFile(req.files, req.body)
        .then(() => res.sendStatus(200))
        .catch(next);
    }
  ]
  
  getProviders = [
    (req: IRequest, res: IResponse, next: INext) => {
      this.service.getProviders(req.query)
        .then((result) => res.json(result))
        .catch(next);
    }
  ]
  
  getProvider = [
    (req: IRequest, res: IResponse, next: INext) => {
      this.service.getProvider(req.params.provider, req.query)
        .then((result) => res.json(result))
        .catch(next);
    }
  ]
  
  getProducts = [
    (req: IRequest, res: IResponse, next: INext) => {
      this.service.getProducts(req.query)
        .then((result) => res.json(result))
        .catch(next);
    }
  ]
  
  getProduct = [
    (req: IRequest, res: IResponse, next: INext) => {
      this.service.getProduct(req.params.product, req.query)
        .then((result) => res.json(result))
        .catch(next);
    }
  ]
}
import { Request, Response, NextFunction } from 'express';
import { Repository } from './repository';
import { Service } from './service';
import { Connection } from './db';

const service = new Service(new Repository(new Connection()));

export const processFile = [
  function handler(req: Request, res: Response, next: NextFunction) {
    service.processFile(req.files, req.body)
      .then(() => res.sendStatus(200))
      .catch(next);
  }
];

export const getProviders = [
  function handler(req: Request, res: Response, next: NextFunction) {
    service.getProviders(req.query)
      .then((result) => res.json(result))
      .catch(next);
  }
];

export const getProvider = [
  function handler(req: Request, res: Response, next: NextFunction) {
    service.getProvider(req.params.provider, req.query)
      .then((result) => res.json(result))
      .catch(next);
  }
];

export const getProducts = [
  function handler(req: Request, res: Response, next: NextFunction) {
    service.getProducts(req.query)
      .then((result) => res.json(result))
      .catch(next);
  }
];

export const getProduct = [
  function handler(req: Request, res: Response, next: NextFunction) {
    service.getProduct(req.params.product, req.query)
      .then((result) => res.json(result))
      .catch(next);
  }
];
import { IRequest, IResponse, INext } from './types';
import { Repository } from './repository';
import { Service } from './service';
import { Database } from './db';
import { HttpError } from './helpers';
import { Writable } from 'stream';
import is from '@ncardez/is';
import csv from 'csvtojson';

const database = new Database();
const repository = Repository(database);
const utils = { csv, is, HttpError, Writable };
const service = Service(repository, utils);

export function Controller() {
  return {
    async processFile(req: IRequest, res: IResponse, next: INext) {
      const config = {
        provider: req.headers['x-csv-provider'] as string,
        columns: req.headers['x-csv-columns'] as string,
        nullObject: req.headers['x-csv-nullobject'],
        delimiter: req.headers['x-csv-delimiter'],
        quote: req.headers['x-csv-quote'],
        trim: req.headers['x-csv-trim'],
        ignoreEmpty: req.headers['x-csv-ignoreempty'],
        noHeader: req.headers['x-csv-noheader'],
        batchSize: req.headers['x-csv-batchSize'],
        contentType: req.headers['content-type'],
      };

      return service.processFile(req, config)
        .then((result) => res.json(result))
        .catch((error) => next(error));
    },

    async getProviders(req: IRequest, res: IResponse, next: INext) {
      return service.getProviders(req.query)
        .then((result) => res.json(result))
        .catch((error) => next(error));
    },
    
    async getProvider(req: IRequest, res: IResponse, next: INext) {
      return service.getProvider(req.params.provider, req.query)
        .then((result) => res.json(result))
        .catch((error) => next(error));
    },
  
    async getCars(req: IRequest, res: IResponse, next: INext) {
      return service.getCars(req.query)
        .then((result) => res.json(result))
        .catch((error) => next(error));
    },
  
    async getCar(req: IRequest, res: IResponse, next: INext) {
      return service.getCar(req.params.car, req.query)
        .then((result) => res.json(result))
        .catch((error) => next(error));
    }
  }
}
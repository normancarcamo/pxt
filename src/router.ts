import { notAllowed } from './middlewares';
import { Database } from './db';
import { Repository } from './repository';
import { Service } from './service';
import { Controller } from './controller';
import { csvParser, HttpError } from './helpers';
import express from 'express';
import csv from 'csv-parse';
import is from '@ncardez/is';

const utils = { csv, is, csvParser, HttpError };
const controller = new Controller(
  new Service(
    new Repository(new Database()), 
    utils
  )
);

const router = express.Router();

router.route('/upload')
  .post(controller.processFile)
  .all(notAllowed);

router.route('/providers')
  .get(controller.getProviders)
  .all(notAllowed);

router.route('/providers/:provider')
  .get(controller.getProvider)
  .all(notAllowed);

router.route('/products')
  .get(controller.getProducts)
  .all(notAllowed);

router.route('/products/:product')
  .get(controller.getProduct)
  .all(notAllowed);

export default router;
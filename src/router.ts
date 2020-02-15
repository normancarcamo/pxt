import { notAllowed } from './middlewares';
import { Database } from './db';
import { Repository } from './repository';
import { Service } from './service';
import { Controller } from './controller';
import { Util } from './utils';
import express from 'express';

const controller = new Controller(
  new Service(
    new Repository(new Database()), 
    new Util()
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
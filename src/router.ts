import express from 'express';
import { notAllowed } from './middlewares';
import * as controller from './controller';

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
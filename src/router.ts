import { notAllowed } from './middlewares';
import { Controller } from './controller';
import express from 'express';

const controller = Controller();
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

router.route('/cars')
  .get(controller.getCars)
  .all(notAllowed);

router.route('/cars/:car')
  .get(controller.getCar)
  .all(notAllowed);

export default router;
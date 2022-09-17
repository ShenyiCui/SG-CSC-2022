import express from 'express';
import StigController from '../controllers/StigController';

export default () => {
  const indexRouter = express.Router();
  const stigController = new StigController();

  indexRouter.post('/warmup', stigController.warmUp);

  return indexRouter;
};

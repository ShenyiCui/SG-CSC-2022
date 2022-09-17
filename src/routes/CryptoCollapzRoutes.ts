import express from 'express';
import CryptoCollapzController from '../controllers/CryptoCollapzController';

export default () => {
  const indexRouter = express.Router();
  const cryptoCollapzController = new CryptoCollapzController();

  indexRouter.post('/', cryptoCollapzController.index);

  return indexRouter;
};

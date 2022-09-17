import express from 'express';
import MagicCauldronsController from '../controllers/MagicCauldrons';

export default () => {
  const indexRouter = express.Router();
  const magicCualdronController = new MagicCauldronsController();

  indexRouter.post('/', magicCualdronController.index);

  return indexRouter;
};

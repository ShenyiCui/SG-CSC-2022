import express, {Application} from 'express';
import bodyParser from 'body-parser';

import IndexRoutes from './routes/IndexRoutes';
import CryptoCollapzRoutes from './routes/CryptoCollapzRoutes';
export default class App {
  public app: Application;

  constructor() {
    this.app = express();
  }

  public initMiddlewares() {
    this.app.use(bodyParser.json({limit: '5gb'}));
    this.app.use(bodyParser.urlencoded({extended: true, limit: '5gb'}));
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, DELETE'
      );
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, x-auth-token'
      );
      next();
    });
  }

  public initControllers() {
    this.app.use('/', IndexRoutes());
    this.app.use('/cryptocollapz', CryptoCollapzRoutes());
  }

  public listen(port: string) {
    this.app.listen(port, () => {
      console.log(`⚡️[server]: Server is running on port ${port}`);
    });
  }
}

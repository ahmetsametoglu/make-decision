import 'module-alias/register';
import express from 'express';
import bodyParser from 'body-parser';
import { config } from './config';
import { connect } from 'mongoose';
import { logger } from './middlewares/logger.middleware';
import router from './routes';
import { handleError, handleRouteError } from './middlewares/error.middleware';
import { corsCredential } from './middlewares/cors.middleware';
import { startWebSocket } from './api/services/socket.service';

connect(config.mongoURL, {
  bufferCommands: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  autoIndex: false,
})
  .then(() => {
    const app = express();
    const PORT = config.port || 8000;

    //cors configuration
    app.use(corsCredential);

    //middleware
    app.use(bodyParser.json());
    app.use(logger);

    //routes
    app.use(router);

    //errors
    app.use(handleRouteError);
    app.use(handleError);

    //listen port
    app.listen(PORT, err => {
      if (err) return console.error(err);
      return console.log(`Server is listening on ${PORT}`);
    });

    startWebSocket(3003);
  })
  .catch(err => {
    console.log('Database connection failed:', err);
  });

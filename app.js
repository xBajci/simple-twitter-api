'use strict';

import koa from 'koa';
import koaBody from 'koa-body';
import routes from './routes/routes';
import config from './config';

function start() {

  let app = koa();

  app.use(function*(next) {
    try {
      yield next;
    }
    catch (err) {
      this.status = err.status || 500;
      this.body = err.message;

      this.app.emit('error', err, this);
    }
  });

  app.on('error', (err) => {
    console.error('ERROR: '+ err);
  });

  // register body parser
  app.use(koaBody());

  // register routes
  app.use(routes.getRoutes());

  // used when accessing root or any unregistered end-point
  app.use(function *() {
    this.body = 'Tweet tweet... API root';
  });

  app.listen(config.app.port);
}

export default {
  start
};
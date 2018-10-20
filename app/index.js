#!/usr/bin/env node

'use strict';

// Load APM on production environment
const config = require('./config');
const apm = require('./apm');

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const errorHandler = require('./middlewares/errorHandler');
const logMiddleware = require('./middlewares/log');
const logger = require('./logger');
const requestId = require('./middlewares/requestId');
const responseHandler = require('./middlewares/responseHandler');
const router = require('./routes');
const koaSwagger = require('koa2-swagger-ui');
require('./mongoose')();
const passport = require('koa-passport');
const parameter = require('koa-parameter');
const app = new Koa();

app.use(parameter(app));
app.use(
  koaSwagger({
    // host at /swagger instead of default /docs
    routePrefix: '/swagger',
    swaggerOptions: {
      // example path to json
      url: '/spec',
    },
  }),
);


// sessions
const session = require('koa-session');
app.keys = ['secret'];
app.use(session({}, app));

// Trust proxy
app.proxy = true;


// Set middlewares
app.use(
  bodyParser({
    enableTypes: ['json', 'form'],
    formLimit: '10mb',
    jsonLimit: '10mb'
  })
);
app.use(requestId());
app.use(
  cors({
    origin: '*',
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
    exposeHeaders: ['X-Request-Id']
  })
);
app.use(responseHandler());
app.use(errorHandler());
app.use(logMiddleware({ logger }));


require('./passport');
app.use(passport.initialize());
app.use(passport.session());

// Bootstrap application router
app.use(router.routes());
app.use(router.allowedMethods());

function onError(err, ctx) {
  if (apm.active) { apm.captureError(err); }
  if (ctx == null) { logger.error({ err, event: 'error' }, 'Unhandled exception occured'); }
}

// Handle uncaught errors
app.on('error', onError);

// Start server
if (!module.parent) {
  const server = app.listen(config.port, config.host, () => {
    logger.info({ event: 'execute' }, `API server listening on ${config.host}:${config.port}, in ${config.env}`);
  });
  server.on('error', onError);
}

// Expose app
module.exports = app;

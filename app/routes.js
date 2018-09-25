'use strict';

const Router = require('koa-router');
const homeController = require('./controllers/home');
const koaSwagger = require('koa2-swagger-ui');
const router = new Router();
router.get('/', homeController.getApiInfo);
router.get('/spec', homeController.getSwaggerSpec);


module.exports = router;

'use strict';

const Router = require('koa-router');
const homeController = require('./controllers/home');
const signInController = require('./controllers/singIn');
const signUpController = require('./controllers/signUp');
const testController = require('./test/controllers/testAuth');

const router = new Router();


router.get('/', homeController.getApiInfo);
router.get('/spec', homeController.getSwaggerSpec);
router.post('/signIn', signInController.signInController);

//---------------Test---------------//
router.post('/testAuth', testController.testAuth);
//---------------Test---------------//

module.exports = router;

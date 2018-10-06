'use strict';

const Router = require('koa-router');
const homeController = require('./controllers/home');
const signInController = require('./controllers/singIn');
const signUpController = require('./controllers/signUp');
const testController = require('./test/controllers/testAuth');

const router = new Router();


router.get('/', homeController.getApiInfo);
router.get('/spec', homeController.getSwaggerSpec);
router.post('/sign-in', signInController.signInController);
router.post('/sign-up', signUpController.signUpController);

// ---------------Test---------------//
router.post('/test-auth', testController.testAuth);
// ---------------Test---------------//

module.exports = router;

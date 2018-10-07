'use strict';

const Router = require('koa-router');
const homeController = require('./controllers/home');
const signInController = require('./controllers/singIn');
const signUpController = require('./controllers/signUp');
const testController = require('./test/controllers/testAuth');
const signOutController = require('./controllers/signOut');
const { createExperience } = require('./controllers/experience');
const router = new Router();


router.get('/', homeController.getApiInfo);
router.get('/spec', homeController.getSwaggerSpec);
router.post('/sign-in', signInController.signInController);
router.post('/sign-up', signUpController.signUpController);
router.get('/sign-out', signOutController.signOutController);

// ---------------Test---------------//
router.post('/test-auth', testController.testAuth);
// ---------------Test---------------//

router.post('/experience', createExperience);

module.exports = router;

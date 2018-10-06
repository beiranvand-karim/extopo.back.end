'use strict';

const Router = require('koa-router');
const homeController = require('./controllers/home');
const signInController = require('./controllers/singIn');
const signUpController = require('./controllers/signUp');


const router = new Router();


router.get('/', homeController.getApiInfo);
router.get('/spec', homeController.getSwaggerSpec);
router.post('/signIn', signInController.signInController);
router.post('/signUp', signUpController.signUpController);


module.exports = router;

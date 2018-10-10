'use strict';

const Router = require('koa-router');
const homeController = require('./controllers/home');
const signInController = require('./controllers/singIn');
const signUpController = require('./controllers/signUp');
const testController = require('./test/controllers/testAuth');
const signOutController = require('./controllers/signOut');
const { createExperience, readExperience, readAllExperiences, deleteExperience, updateExperience } = require('./controllers/experience');
const { createProject, readProject, readAllProjects, updateProject } = require('./controllers/project');

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
router.get('/experience/:id', readExperience);
router.get('/experience', readAllExperiences);
router.delete('/experience/:id', deleteExperience);
router.put('/experience/:id', updateExperience);


router.post('/project', createProject);
router.get('/project/:id', readProject);
router.get('/project', readAllProjects);
router.put('/project/:id', updateProject);

module.exports = router;

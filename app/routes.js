'use strict';

const Router = require('koa-router');
const homeController = require('./controllers/home');
const signInController = require('./controllers/signIn');
const signUpController = require('./controllers/signUp');
const testController = require('./test/controllers/testAuth');
const signOutController = require('./controllers/signOut');
const { deleteExperience } = require('./controllers/experience/deleteExperience');
const { updateExperience } = require('./controllers/experience/updateExperience');
const { readAllExperiences } = require('./controllers/experience/readAllExperiences');
const { readExperience } = require('./controllers/experience/readExperience');
const { createExperience } = require('./controllers/experience/createExperience');
const { createProject, readProject, readAllProjects, updateProject, deleteProject } = require('./controllers/project/project');
const { createResume, readResume, readAllResumes, updateResume, deleteResume } = require('./controllers/resume/resume');
const { createMembership } = require('./controllers/membership/createMembership');
const { readMembership } = require('./controllers/membership/readMembership');
const { readAllMemberships } = require('./controllers/membership/readAllMemberships');
const { updateMembership } = require('./controllers/membership/updateMembership');
const { deleteMembership } = require('./controllers/membership/deleteMembership');

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
router.delete('/project/:id', deleteProject);


router.post('/resume', createResume);
router.get('/resume/:id', readResume);
router.get('/resume', readAllResumes);
router.put('/resume/:id', updateResume);
router.delete('/resume/:id', deleteResume);


router.post('/membership', createMembership);
router.get('/membership/:id', readMembership);
router.get('/membership', readAllMemberships);
router.put('/membership/:id', updateMembership);
router.delete('/membership/:id', deleteMembership);

module.exports = router;

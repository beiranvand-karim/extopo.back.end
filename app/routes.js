'use strict';

const Router = require('koa-router');
const homeController = require('./controllers/home');
const signInController = require('./controllers/authentication/signIn');
const signUpController = require('./controllers/authentication/signUp');
const signOutController = require('./controllers/authentication/signOut');

const { deleteExperience } = require('./controllers/experience/deleteExperience');
const { updateExperience } = require('./controllers/experience/updateExperience');
const { readAllExperiences } = require('./controllers/experience/readAllExperiences');
const { readExperience } = require('./controllers/experience/readExperience');
const { createExperience } = require('./controllers/experience/createExperience');
const { searchExperience } = require('./controllers/experience/searchExperience');

const { createProject } = require('./controllers/project/createProject');
const { readProject } = require('./controllers/project/readProject');
const { readAllProjects } = require('./controllers/project/readAllProjects');
const { updateProject } = require('./controllers/project/updateProject');
const { deleteProject } = require('./controllers/project/deleteProject');
const { searchProject } = require('./controllers/project/searchProject');

const { createResume } = require('./controllers/resume/createResume');
const { readResume } = require('./controllers/resume/readResume');
const { readAllResumes } = require('./controllers/resume/readAllResumes');
const {  updateResume } = require('./controllers/resume/updateResume');
const {  deleteResume } = require('./controllers/resume/deleteResume');
const {  searchResume } = require('./controllers/resume/searchResume');

const { createMembership } = require('./controllers/membership/createMembership');
const { readMembership } = require('./controllers/membership/readMembership');
const { readAllMemberships } = require('./controllers/membership/readAllMemberships');
const { updateMembership } = require('./controllers/membership/updateMembership');
const { deleteMembership } = require('./controllers/membership/deleteMembership');

const { createSurvey } = require('./controllers/survey/createSurvey');
const { readSurvey } = require('./controllers/survey/readSurvey');
const { readAllSurveys } = require('./controllers/survey/readAllsurveys');
const { updateSurvey } = require('./controllers/survey/updateSurvey');
const { deleteSurvey } = require('./controllers/survey/deleteSurvey');

const { createReview } = require('./controllers/review/createReview');
const { readReview } = require('./controllers/review/readReview');
const { readAllReviews } = require('./controllers/review/readAllReviews');
const { updateReview } = require('./controllers/review/updateReview');
const { deleteReview } = require('./controllers/review/deleteReview');

const { readProvince } = require('./controllers/province/readProvince');
const { readAllProvinces } = require('./controllers/province/readAllProvinces');

const { createScore } = require('./controllers/score/createScore');
const { deleteScore } = require('./controllers/score/deleteScore');
const { readAllScores } = require('./controllers/score/readAllScores');
const { readScore } = require('./controllers/score/readScore');
const { updateScore } = require('./controllers/score/updateScore');


const router = new Router();

router.get('/', homeController.getApiInfo);
router.get('/spec', homeController.getSwaggerSpec);
router.post('/sign-in', signInController.signInController);
router.post('/sign-up', signUpController.signUpController);
router.get('/sign-out', signOutController.signOutController);


router.post('/experience', createExperience);
router.get('/experience/:id', readExperience);
router.get('/experience', readAllExperiences);
router.delete('/experience/:id', deleteExperience);
router.put('/experience/:id', updateExperience);
router.post('/experience/search', searchExperience);


router.post(/project/, createProject);
router.get('/project/:id', readProject);
router.get(/project/, readAllProjects);
router.put('/project/:id', updateProject);
router.delete('/project/:id', deleteProject);
router.post('/project/search', searchProject);


router.post('/resume', createResume);
router.get('/resume/:id', readResume);
router.get('/resume', readAllResumes);
router.put('/resume/:id', updateResume);
router.delete('/resume/:id', deleteResume);
router.post('/resume/search', searchResume);


router.post('/membership', createMembership);
router.get('/membership/:id', readMembership);
router.get('/membership', readAllMemberships);
router.put('/membership/:id', updateMembership);
router.delete('/membership/:id', deleteMembership);


router.post('/survey', createSurvey);
router.get('/survey/:id', readSurvey);
router.get('/survey', readAllSurveys);
router.put('/survey/:id', updateSurvey);
router.delete('/survey/:id', deleteSurvey);

router.post('/review', createReview);
router.get('/review/:id', readReview);
router.get('/review', readAllReviews);
router.put('/review/:id', updateReview);
router.delete('/review/:id', deleteReview);

router.get('/province/:id', readProvince);
router.get('/province', readAllProvinces);

router.post('/score', createScore);
router.delete('/score/:id', deleteScore);
router.get('/score', readAllScores);
router.get('/score/:id', readScore);
router.put('/score/:id', updateScore);


module.exports = router;

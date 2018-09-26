'use strict';

const pkginfo = require('../../package.json');
const spec = require('../spec');

/**
 * @swagger
 *
 * /signup:
 *   post:
 *     description: Signup new user with email
 *     produces:
 *       - application/json
 *     parameters:
 *       - email: email
 *         description: Username to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: confirmPassword
 *         description: Confirmation of User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: signup
 */
exports.signup = ctx => {
  //create user 
  return ctx.res.ok({
    {/*data*/},
    message: 'User Created'
  });

/**
 * @swagger
 * /spec:
 *   get:
 *     tags:
 *       - Public
 *     summary: Get Open API specification.
 *     operationId: getSwaggerSpec
 *     responses:
 *       200:
 *         description: Describe Swagger Open API Specification
 */
exports.getSwaggerSpec = ctx => {
  ctx.body = spec;
};

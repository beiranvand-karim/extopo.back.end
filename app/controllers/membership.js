
const Membership = require('../models/membership');

exports.createMembership = async ctx => {
  if (ctx.isAuthenticated()) {
    try {
      const { userId, userType } = ctx.request.body;
      // create section
      const newMembership = new Membership({ startDate: new Date(), endDate: new Date(), userId, userType });
      const response = await newMembership.save();

      if (response) {
        ctx.status = 201;
        return ctx.body = response;
      }
      // not found section
      ctx.status = 404;
      return ctx.body = 'NOT found';
    } catch (e) {
      ctx.status = 500;
      ctx.body = e.message;
    }
  } else {
    ctx.status = 401;
    return ctx.body = 'NOT Authenticated';
  }
};

exports.readMembership = async ctx => {
  if (ctx.isAuthenticated()) {
    try {
      // found section
      const response = await Membership.findById(ctx.params.id);
      if (response) {
        ctx.status = 200;
        return ctx.body = response;
      }
      // not found section
      ctx.status = 404;
      return ctx.body = 'NOT found.';
    } catch (e) {
      ctx.status = e.code;
      ctx.body = e.message;
    }
  } else {
    ctx.status = 401;
    return ctx.body = 'NOT Authenticated.';
  }
};

exports.readAllMemberships = async ctx => {
  if (ctx.isAuthenticated()) {
    try {
      // found section
      const response = await Membership.find();
      if (response) {
        ctx.status = 200;
        return ctx.body = response;
      }
      // not found section
      ctx.status = 404;
      return ctx.body = 'NOT found';
    } catch (e) {
      ctx.status = 500;
      ctx.body = e.message;
    }
  } else {
    ctx.status = 401;
    return ctx.body = 'NOT Authenticated';
  }
};

exports.updateMembership = async ctx => {
  if (ctx.isAuthenticated()) {
    try {
      const { userId, userType, startDate, endDate } = ctx.request.body;

      const updatedFields = {};

      (userId) && Object.assign(updatedFields, { userId });
      (userType) && Object.assign(updatedFields, { userType });
      (startDate) && Object.assign(updatedFields, { startDate });
      (endDate) && Object.assign(updatedFields, { endDate });

      // update section
      const response = await Membership.updateOne({ '_id': ctx.params.id }, updatedFields);
      if (response.n === 1) {
        ctx.status = 200;
        return ctx.body = 'the membership updated';
      }
      // not found section
      ctx.status = 404;
      return ctx.body = 'NOT found';
    } catch (e) {
      ctx.status = 500;
      ctx.body = e.message;
    }
  } else {
    ctx.status = 401;
    return ctx.body = 'NOT Authenticated';
  }
};

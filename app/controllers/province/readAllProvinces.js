
const Provinces = require('../../assets/provinces/Province');

module.exports.readAllProvinces = async ctx => {
  if (ctx.isAuthenticated()) {
    try {
      Provinces.forEach(province => delete province.cities);
      const response = Provinces;
      if (response) {
        ctx.status = 200;
        return ctx.body = response;
      }
      // not found section
      ctx.status = 404;
      return ctx.body = 'NOT found';
    } catch (e) {
      ctx.status = e.code;
      ctx.body = e;
    }
  } else {
    ctx.status = 401;
    return ctx.body = 'NOT Authenticated';
  }
};

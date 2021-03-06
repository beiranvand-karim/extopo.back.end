
const Province = require('../../assets/provinces/Province');

module.exports.readProvince = async ctx => {
  if (ctx.isAuthenticated()) {
    try {
      const response = Province[ctx.params.id];
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

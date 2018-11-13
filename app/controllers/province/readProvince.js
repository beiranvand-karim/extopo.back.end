
const Province = require('../../assets/provinces/Province');

module.exports.readProvince = async ctx => {
  if (ctx.isAuthenticated()) {
    try {
      if (Province[ctx.params.id] !== undefined) {
        ctx.status = 200;
        return ctx.body = Province[ctx.params.id];
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

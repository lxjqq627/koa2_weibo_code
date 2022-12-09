/**
 * @description error view 路由 404
 * @author: 刘新金
 */
const router = require('koa-router')();

// error
router.get('/error', async (ctx, next) => {
  await ctx.render('error');
});

// 404
router.get('*', async (ctx, next) => {
  await ctx.render('404');
});

module.exports = router;

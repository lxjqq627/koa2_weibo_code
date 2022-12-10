/**
 * @description 用户 API 路由
 * @author: 刘新金
 */

const router = require('koa-router')();
const { isExist } = require('../../controller/user');

router.prefix('/api/user'); // 路由前缀

// 注册路由
router.post('/register', async (ctx, next) => {});

// 用户名是否存在路由
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body;
  ctx.body = await isExist(userName);
});

module.exports = router;

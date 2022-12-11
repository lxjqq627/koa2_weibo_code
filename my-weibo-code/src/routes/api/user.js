/**
 * @description 用户 API 路由
 * @author: 刘新金
 */

const router = require('koa-router')();
const { isExist, register } = require('../../controller/user');
const userValidate = require('../../validator/user');
const { genValidator } = require('../../middlewares/validator');

router.prefix('/api/user'); // 路由前缀

// 注册路由
router.post('/register', genValidator(userValidate), async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body;
  // 调用controller的方法
  ctx.body = await register({ userName, password, gender });
});

// 用户名是否存在路由
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body;
  ctx.body = await isExist(userName);
});

module.exports = router;

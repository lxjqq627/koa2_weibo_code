/**
 * @description 用户 API 路由
 * @author: 刘新金
 */

const router = require('koa-router')();
const {
  isExist,
  register,
  login,
  deleteCurUser,
  changeInfo,
  changePassword,
  logout,
} = require('../../controller/user');
const userValidate = require('../../validator/user');
const { genValidator } = require('../../middlewares/validator');
const { isTest } = require('../../utils/env');
const { loginCheck } = require('../../middlewares/loginChecks');
const { getFollowers } = require('../../controller/user-relation');

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

// 登录路由
router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body;
  // 调用controller的方法
  ctx.body = await login(ctx, userName, password);
});

// 删除
router.post('/delete', loginCheck, async (ctx, next) => {
  if (isTest) {
    // 测试环境下，测试账号登录之后，测试账号信息存储在session中
    const { userName } = ctx.session.userInfo;
    ctx.body = await deleteCurUser(userName);
  }
});

// 修改个人信息
router.patch(
  '/changeInfo',
  loginCheck,
  genValidator(userValidate),
  async (ctx, next) => {
    const { nickName, city, picture } = ctx.request.body;
    ctx.body = await changeInfo(ctx, { nickName, city, picture });
  }
);

// 修改密码
router.patch(
  '/changePassword',
  loginCheck,
  genValidator(userValidate),
  async (ctx, next) => {
    const { password, newPassword } = ctx.request.body;
    const { userName } = ctx.session.userInfo;
    ctx.body = await changePassword(userName, password, newPassword);
  }
);

// 退出登录
router.post('/logout', loginCheck, async (ctx, next) => {
  ctx.body = await logout(ctx);
});

// 获取at列表
router.get('/getAtList', loginCheck, async (ctx, next) => {
  const { id: userId } = ctx.session.userInfo;
  const result = await getFollowers(userId);
  const { followersList } = result.data;
  const list = followersList.map((user) => {
    return `${user.nickName} - ${user.userName}`;
  });
  ctx.body = list;
});

module.exports = router;

const router = require('koa-router')();
const jwt = require('jsonwebtoken');
const util = require('util');
const verify = util.promisify(jwt.verify); // 解密
const { SECRET } = require('../conf/constans');

router.prefix('/users');

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!';
});

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response';
});

// 模拟登录
router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body;
  let userInfo;
  if (userName === 'zhangsan' && password === 'abc123') {
    userInfo = {
      userId: 1,
      userName: 'zhangsan',
      nickName: '张三',
      gender: 1,
    };
  }

  // 加密用户信息
  let token;
  if (userInfo) {
    token = jwt.sign(userInfo, SECRET);
  }

  if (userInfo == null) {
    ctx.body = {
      errno: -1,
      msg: '登录失败',
    };
    return;
  }

  ctx.body = {
    error: 0,
    data: token,
  };
});

// 获取用户信息
router.get('/getUserInfo', async (ctx, next) => {
  const token = ctx.header.authorization;
  try {
    const payload = await verify(token.split(' ')[1], SECRET);
    ctx.body = {
      error: 0,
      userInfo: payload,
    };
  } catch (ex) {
    console.error(ex);
    ctx.body = {
      error: -1,
      userInfo: 'verify token fail',
    };
  }
});

module.exports = router;

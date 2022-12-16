const path = require('path');
const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const koaStatic = require('koa-static');

const { REDIS_CONF } = require('./conf/db');
const { isProd } = require('./utils/env');
const { SESSION_SECRET_KEY } = require('./conf/secretKeys');

// routes
const atAPIRouter = require('./routes/api/blog-at');
const squareAPIRouter = require('./routes/api/blog-square');
const profileAPIRouter = require('./routes/api/blog-profile');
const homeApiRouter = require('./routes/api/blog-home');
const blogViewRouter = require('./routes/view/blog');
const utilsApiRouter = require('./routes/api/utils');
const userViewRouter = require('./routes/view/user');
const userApiRouter = require('./routes/api/user');
const errorViewRouter = require('./routes/view/error');

// error handler
let onerrorConf = {};
if (isProd) {
  // 生产环境 本地环境不跳转
  onerrorConf = {
    redirect: '/error', // 错误处理 重定向到 /error
  };
}
onerror(app, onerrorConf); // 错误处理 打印到页面

// middlewares 中间件
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  })
); // 解析数据
app.use(json()); // 解析json
app.use(logger()); // 日志
app.use(koaStatic(__dirname + '/public')); // 静态资源
app.use(koaStatic(path.join(__dirname, '..', 'uploadFiles')));

// 配置模板引擎
app.use(
  views(__dirname + '/views', {
    extension: 'ejs',
  })
); // 视图  ejs

// session 配置
app.keys = [SESSION_SECRET_KEY]; // 加密cookie
app.use(
  session({
    key: 'weibo.sid', // cookie name 默认是 'koa.sid'
    prefix: 'weibo:sess:', // redis key 的前缀，默认是 'koa:sess:'
    cookie: {
      path: '/', // 默认配置 可以不写 cookie 的配置 也可以自己配置
      httpOnly: true, // 只能服务端修改 cookie 不能客户端修改
      maxAge: 24 * 60 * 60 * 1000, // cookie 的过期时间 1天 24小时 60分钟 60秒 1000毫秒
    },
    store: redisStore({
      // session 存储到 redis
      all: `${REDIS_CONF.host}:${REDIS_CONF.port}`, // redis 的地址
    }),
  })
);

// routes
app.use(atAPIRouter.routes(), atAPIRouter.allowedMethods());
app.use(squareAPIRouter.routes(), squareAPIRouter.allowedMethods());
app.use(profileAPIRouter.routes(), profileAPIRouter.allowedMethods());
app.use(homeApiRouter.routes(), homeApiRouter.allowedMethods());
app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods());
app.use(utilsApiRouter.routes(), utilsApiRouter.allowedMethods());
app.use(userViewRouter.routes(), userViewRouter.allowedMethods());
app.use(userApiRouter.routes(), userApiRouter.allowedMethods());
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods()); // 错误处理 注册到最下面

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
}); // 错误处理

module.exports = app;

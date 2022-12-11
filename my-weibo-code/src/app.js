const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const session = require('koa-generic-session');
const redisStore = require('koa-redis');

const { REDIS_CONF } = require('./conf/db');
const { isProd } = require('./utils/env');
const { SESSION_SECRET_KEY } = require('./conf/secretKeys');

// routes
const index = require('./routes/index');
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
app.use(require('koa-static')(__dirname + '/public')); // 静态资源

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
    ttl: 24 * 60 * 60 * 1000, // redis 过期时间 1天 24小时 60分钟 60秒 1000毫秒 可以不写 工具已经做好时间和maxAge一样 但是不建议不写
    store: redisStore({
      // session 存储到 redis
      all: `${REDIS_CONF.host}:${REDIS_CONF.port}`, // redis 的地址
    }),
  })
);

// routes
app.use(index.routes(), index.allowedMethods());
app.use(userViewRouter.routes(), userViewRouter.allowedMethods());
app.use(userApiRouter.routes(), userApiRouter.allowedMethods());

app.use(errorViewRouter.routes(), index.allowedMethods()); // 错误处理 注册到最下面

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
}); // 错误处理

module.exports = app;

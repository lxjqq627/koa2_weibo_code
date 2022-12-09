/**
 * @description 存储配置
 * @author: 刘新金
 * @version: V1.0
 */
const { isProd } = require('../utils/env');

let REDIS_CONF = {
  port: 6379, // 端口号
  host: '127.0.0.1',
};

let MYSQL_CONF = {
  host: 'localhost',
  user: 'root',
  password: 'Newgold627@0',
  port: 3306,
  database: 'koa2_weibo_db',
};

if (isProd) {
  REDIS_CONF = {
    port: 6379, // 端口号
    host: '127.0.0.1',
  };
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'Newgold627@0',
    port: 3306,
    database: 'koa2_weibo_db',
  };
}

module.exports = {
  REDIS_CONF,
  MYSQL_CONF,
};

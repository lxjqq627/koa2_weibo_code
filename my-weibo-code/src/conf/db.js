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

if (isProd) {
  REDIS_CONF = {
    port: 6379, // 端口号
    host: '127.0.0.1',
  };
}

module.exports = {
  REDIS_CONF,
};

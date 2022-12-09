/**
 * @description 连接redis的方法 get set
 * @author: 刘新金
 */
const redis = require('redis');
const { REDIS_CONF } = require('../conf/db');

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);
redisClient.on('error', (err) => {
  console.error(err);
});

/**
 * @param {string} key redis key
 * @param {string} val redis value
 * @param {number} timeout 过期时间 单位 秒
 */
function set(key, val, timeout = 60 * 60) {
  if (typeof val === 'object') {
    val = JSON.stringify(val);
  }
  redisClient.set(key, val); // 设置值
  redisClient.expire(key, timeout); // 设置过期时间
}
/**
 *
 * @param {string} key redis key
 */
function get(key) {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err);
        return;
      }
      if (val == null) {
        resolve(null);
        return;
      }
      try {
        resolve(JSON.parse(val)); // 尝试转换为对象
      } catch (ex) {
        resolve(val); // 转换失败，返回原始值
      }
    });
  });
  return promise;
}
module.exports = {
  set,
  get,
};

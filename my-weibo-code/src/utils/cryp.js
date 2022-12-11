/**
 * @description 加密方法
 * @author: 刘新金
 */

const crypto = require('crypto');
const { CRYPTO_SECRET_KEY } = require('../conf/secretKeys');

/**
 * md5 加密
 * @param {string} content 明文
 */
function _md5(content) {
  const md5 = crypto.createHash('md5'); // 创建一个md5加密对象
  return md5.update(content).digest('hex'); // 16进制
}

/**
 * 加密方法
 * @param {string} content
 */
function doCrypto(content) {
  const str = `password=${content}&key=${CRYPTO_SECRET_KEY}`;
  return _md5(str);
}

module.exports = doCrypto;

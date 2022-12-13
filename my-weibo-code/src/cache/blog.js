/**
 * @description 微博数据缓存层
 * @author 刘新金
 */

const { get, set } = require('./_redis');
const { getBlogListByUser } = require('../services/blog');

const KEY_PREFIX = 'weibo:square:'; // redis key 前缀

/**
 * 获取广场微博列表缓存
 * @param {number} pageIndex
 * @param {number} pageSize
 * @returns
 */
async function getSquareCacheList(pageIndex, pageSize) {
  const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`;

  // 尝试获取缓存
  const cacheResult = await get(key);
  if (cacheResult != null) {
    // 获取缓存成功
    return cacheResult;
  }

  // 没有缓存，读取数据库
  const result = await getBlogListByUser({ pageIndex, pageSize });

  // 设置缓存，过期时间 1min
  set(key, result, 60);

  return result;
}

module.exports = {
  getSquareCacheList,
};

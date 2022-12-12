/**
 * @description 微博数据相关的服务
 * @author: 刘新金
 */

const { Blog } = require('../db/model/index');

/**
 * 创建微博
 * @param {Object} param0
 * @returns
 */
async function createBlog({ userId, content, image }) {
  const result = await Blog.create({
    userId,
    content,
    image,
  });
  return result.dataValues;
}

module.exports = {
  createBlog,
};

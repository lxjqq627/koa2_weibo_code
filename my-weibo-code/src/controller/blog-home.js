/**
 * @description 首页 controller
 * @author: 刘新金
 */

const xss = require('xss');
const { createBlog } = require('../services/blog');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { createBlogFailInfo } = require('../model/ErrorInfo');

/**
 * 创建微博
 * @param {Object} param0 创建微博所需的数据 { userId, content, image }
 * @returns {Object} 创建微博结果
 */
async function create({ userId, content, image }) {
  try {
    const blog = await createBlog({ userId, content: xss(content), image }); // 创建微博
    return new SuccessModel(blog);
  } catch (ex) {
    console.error(ex.message, ex.stack);
    return new ErrorModel(createBlogFailInfo);
  }
}

module.exports = {
  create,
};

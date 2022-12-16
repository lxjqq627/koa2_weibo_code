/**
 * @description 首页 controller
 * @author: 刘新金
 */

const xss = require('xss');
const { createBlog, getFollowersBlogList } = require('../services/blog');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { createBlogFailInfo } = require('../model/ErrorInfo');
const { PAGE_SIZE } = require('../conf/constant');
const { REG_FOR_AT_WHO } = require('../conf/constant');
const { getUserInfo } = require('../services/user');
const { createAtRelation } = require('../services/at-relation');

/**
 * 创建微博
 * @param {Object} param0 创建微博所需的数据 { userId, content, image }
 * @returns {Object} 创建微博结果
 */
async function create({ userId, content, image }) {
  // 分析并收集 content 中的 @ 用户
  // content 格式如 '哈喽 @李四 - lisi 你好 @王五 - wangwu'
  const atUserNameList = [];
  content = content.replace(REG_FOR_AT_WHO, (matchStr, nickName, userName) => {
    // 目的不是 replace，而是获取 userName
    atUserNameList.push(userName);
    return matchStr; // 替换不生效
  });

  // 根据 @ 用户名查询用户信息
  const atUserList = await Promise.all(
    atUserNameList.map((userName) => getUserInfo(userName))
  );

  // 根据用户信息，获取用户 id
  const atUserIdList = atUserList.map((user) => user.id);

  try {
    const blog = await createBlog({ userId, content: xss(content), image }); // 创建微博

    // 创建 @ 关系
    await Promise.all(
      atUserIdList.map((userId) => createAtRelation(blog.id, userId))
    );

    // blog.id
    // service

    return new SuccessModel(blog); // 返回结果
  } catch (ex) {
    console.error(ex.message, ex.stack);
    return new ErrorModel(createBlogFailInfo);
  }
}

/**
 * 获取首页微博列表
 * @param {number} userId userId
 * @param {number} pageIndex page index
 */
async function getHomeBlogList(userId, pageIndex = 0) {
  const result = await getFollowersBlogList({
    userId,
    pageIndex,
    pageSize: PAGE_SIZE,
  });
  const { count, blogList } = result;

  // 返回
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count,
  });
}

module.exports = {
  create,
  getHomeBlogList,
};

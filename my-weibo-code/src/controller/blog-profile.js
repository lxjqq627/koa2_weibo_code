/**
 * @description 个人主页 controller
 * @author 刘新金
 */

const { PAGE_SIZE } = require('../conf/constant');
const { SuccessModel } = require('../model/ResModel');
const { getBlogListByUser } = require('../services/blog');

/**
 * 获取个人主页微博列表
 * @param {string} userName 用户名
 * @param {number} pageIndex 当前页数
 */
async function getProfileBlogList(userName, pageIndex = 0) {
  // service
  const result = await getBlogListByUser({
    userName,
    pageIndex,
    pageSize: PAGE_SIZE,
  });

  const blogList = result.blogList;

  // 拼接返回数据
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count: result.count,
  });
}

module.exports = {
  getProfileBlogList,
};

/**
 * @description 微博 @ 用户关系 controller
 * @author: 刘新金
 */

const { SuccessModel, ErrorModel } = require('../model/ResModel');
const {
  getAtRelationCount,
  getAtUserBlogList,
  updateAtRelation,
} = require('../services/at-relation');

const { PAGE_SIZE } = require('../conf/constant');

/**
 * 获取 @ 我的微博数量
 * @param {number} userId
 * @returns
 */
async function getAtMeCount(userId) {
  const result = await getAtRelationCount(userId);
  return new SuccessModel({ count: result });
}

/**
 * 获取 @ 用户的微博列表
 * @param {number} userId
 * @param {number} pageIndex
 */
async function getAtMeBlogList(userId, pageIndex = 0) {
  const result = await getAtUserBlogList({
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

/**
 * 标记为已读
 * @param {number} userId
 */
async function markAsRead(userId) {
  try {
    await updateAtRelation({ newIsRead: true }, { userId, isRead: false });
  } catch (ex) {
    console.error(ex.message, ex.stack);
  }
}

module.exports = {
  getAtMeCount,
  getAtMeBlogList,
  markAsRead,
};

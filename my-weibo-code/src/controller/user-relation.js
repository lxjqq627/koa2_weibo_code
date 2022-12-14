/**
 * @description 用户关系 controller
 * @author 刘新金
 */
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const {
  addFollowerFailInfo,
  deleteFollowerFailInfo,
} = require('../model/ErrorInfo');
const {
  getUsersByFollower,
  addFollow,
  deleteFollow,
  getFollowersByUser,
} = require('../services/user-relation');

/**
 * 根据userId获取粉丝列表
 * @param {number} userId 用户 id
 */
async function getFans(userId) {
  // service
  const { count, userList } = await getUsersByFollower(userId);
  return new SuccessModel({
    count,
    fansList: userList,
  });
}

/**
 * 获取关注人列表
 * @param {number} userId
 * @returns
 */
async function getFollowers(userId) {
  // service
  const { count, userList } = await getFollowersByUser(userId);
  return new SuccessModel({
    count,
    followersList: userList,
  });
}

/**
 * 关注
 * @param {string} myUserId 当前登录的用户ID
 * @param {string} curUserId 要被关注的用户ID
 * @returns
 */
async function follow(myUserId, curUserId) {
  try {
    await addFollow(myUserId, curUserId);
    return new SuccessModel();
  } catch (ex) {
    console.error(ex.message, ex.stack);
    return new ErrorModel(addFollowerFailInfo);
  }
}

/**
 * 取消关注
 * @param {string} myUserId
 * @param {string} curUserId
 */
async function unFollow(myUserId, curUserId) {
  const result = await deleteFollow(myUserId, curUserId);
  if (result) {
    return new SuccessModel();
  }
  return new ErrorModel(deleteFollowerFailInfo);
}

module.exports = {
  getFans,
  follow,
  unFollow,
  getFollowers,
};

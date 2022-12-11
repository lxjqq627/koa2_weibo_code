/**
 * @description 用户数据相关的服务
 * @author: 刘新金
 */

const { User } = require('../db/model/index');
const { formatUser } = require('./_format');

/**
 * 获取用户信息
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function getUserInfo(userName, password) {
  // 查询条件
  const whereOpt = {
    userName,
  };
  if (password) {
    Object.assign(whereOpt, { password });
  }
  // 查询
  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
    where: whereOpt,
  });
  if (result === null) {
    // 未找到传过来的这个用户名
    return result;
  }
  // 格式化
  const formatRes = formatUser(result.dataValues);
  return formatRes; // 返回数据库中找到的数据
}

/**
 * 创建用户
 * @param {string} userName
 * @param {string} password
 * @param {number} gender
 * @param {string} nickName
 */
async function createUser({ userName, password, gender = 3, nickName }) {
  const result = await User.create({
    userName,
    password,
    nickName: nickName ? nickName : userName,
    gender,
  });
  return result.dataValues;
}

module.exports = {
  getUserInfo,
  createUser,
};

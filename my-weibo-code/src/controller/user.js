/**
 * @description 用户关系 controller
 * @author: 刘新金
 */

const { getUserInfo, createUser } = require('../services/user');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo,
} = require('../model/ErrorInfo');
const doCrypto = require('../utils/cryp');

/**
 * 用户名是否存在
 * @param {string} userName 用户名
 */
async function isExist(userName) {
  const userInfo = await getUserInfo(userName); // 1.调用services
  if (userInfo) {
    // 2.判断是否存在
    return new SuccessModel(userInfo);
  } else {
    return new ErrorModel(registerUserNameNotExistInfo);
  }
}

/**
 * 注册
 * @param {string} userName
 * @param {string} password
 * @param {number} gender
 */
async function register({ userName, password, gender }) {
  const userInfo = await getUserInfo(userName); // 1.调用services
  if (userInfo) {
    // 用户名已存在
    return ErrorModel(registerUserNameExistInfo);
  }

  // 注册service
  try {
    await createUser({
      userName,
      password: doCrypto(password),
      gender,
    });
    return new SuccessModel();
  } catch (ex) {
    console.error(ex.message, ex.stack);
    return new ErrorModel(registerFailInfo);
  }
}

/**
 *
 * @param {Object} ctx koa2 ctx
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function login(ctx, userName, password) {
  const userInfo = await getUserInfo(userName, doCrypto(password));
  console.log('userInfo-->', userInfo);
  if (!userInfo) {
    // 登录失败
    return new ErrorModel(loginFailInfo);
  }

  if (ctx.session.userInfo == null) {
    ctx.session.userInfo = userInfo;
  }

  return new SuccessModel();
}

module.exports = {
  isExist,
  register,
  login,
};

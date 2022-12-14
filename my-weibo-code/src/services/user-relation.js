/**
 * @description 用户关系 services
 * @author 刘新金
 */
const { User, UserRelation } = require('../db/model/index');
const { formatUser } = require('./_format');

/**
 * @description 根据followerId获取被关注人粉丝列表
 * @param {number} followerId 被关注人ID
 */
async function getUsersByFollower(followerId) {
  const result = await User.findAndCountAll({
    attributes: ['id', 'userName', 'nickName', 'picture'],
    order: [['id', 'desc']],
    include: [
      // 关联查询
      {
        model: UserRelation,
        where: {
          followerId, //
        },
      },
    ],
  });

  // result.count 总数
  // result.rows 查询结果，数组

  // 格式化
  let userList = result.rows.map((row) => row.dataValues);
  userList = formatUser(userList);

  return {
    count: result.count,
    userList,
  };
}

async function getFollowersByUser(userId) {
  const result = await UserRelation.findAndCountAll({
    order: [['id', 'desc']],
    include: [
      {
        model: User,
        attributes: ['id', 'userName', 'nickName', 'picture'],
      },
    ],
    where: {
      userId,
    },
  });

  // result.count 总数
  // result.rows 查询结果，数组

  let userList = result.rows.map((row) => row.dataValues);
  userList = userList.map((item) => {
    let user = item.user.dataValues;
    user = formatUser(user);
    return user;
  });

  return {
    count: result.count,
    userList,
  };
}

/**
 * @description 添加关注关系
 * @param {number} userId 用户 iD
 * @param {number} followerId 被关注的用户ID
 */
async function addFollow(userId, followerId) {
  // 创建关系
  const result = await UserRelation.create({
    userId,
    followerId,
  });
  return result.dataValues;
}

async function deleteFollow(userId, followerId) {
  const result = await UserRelation.destroy({
    where: {
      userId,
      followerId,
    },
  });
  return result > 0;
}

module.exports = {
  getUsersByFollower,
  addFollow,
  deleteFollow,
  getFollowersByUser,
};

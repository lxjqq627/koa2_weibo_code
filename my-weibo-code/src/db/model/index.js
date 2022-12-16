/**
 * @description 数据模型入口文件
 * @author: 刘新金
 */

const User = require('./User');
const Blog = require('./Blog');
const UserRelation = require('./UserRelation');
const AtRelation = require('./AtRelation');

Blog.belongsTo(User, {
  foreignKey: 'userId',
});

/**
 * 一个用户有多个粉丝
 */
UserRelation.belongsTo(User, {
  foreignKey: 'followerId',
});

/**
 * 一个用户可以关注多个人
 */
User.hasMany(UserRelation, {
  foreignKey: 'userId',
});

/**
 * 一个用户可以创建多个微博
 */
Blog.belongsTo(UserRelation, {
  foreignKey: 'userId',
  targetKey: 'followerId',
});

/**
 * 一个用户可以有多个微博
 */
Blog.hasMany(AtRelation, {
  foreignKey: 'blogId',
});

module.exports = {
  User,
  Blog,
  UserRelation,
  AtRelation,
};

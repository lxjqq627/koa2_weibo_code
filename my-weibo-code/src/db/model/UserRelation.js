/**
 * @description 用户关注关系 model
 * @author: 刘新金
 */

const seq = require('../seq');
const { INTEGER, BOOLEAN, TEXT } = require('../types');

const UserRelation = seq.define('userRelation', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户 id',
  },
  followerId: {
    type: INTEGER,
    allowNull: false,
    comment: '被关注用户的 id',
  },
});

module.exports = UserRelation;

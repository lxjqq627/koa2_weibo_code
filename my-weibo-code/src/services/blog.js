/**
 * @description 微博数据相关的服务
 * @author: 刘新金
 */

const { Blog, User, UserRelation } = require('../db/model/index');
const { formatUser, formatBlog } = require('./_format');
/**
 * 创建微博
 * @param {Object} param0
 * @returns
 */
async function createBlog({ userId, content, image }) {
  const result = await Blog.create({
    userId,
    content,
    image,
  });
  return result.dataValues;
}

/**
 * 获取微博列表
 * @param {string} userName 用户名
 * @param {number} pageIndex 当前页数
 * @param {number} pageSize 每页数量
 */
async function getBlogListByUser({ userName, pageIndex = 0, pageSize = 10 }) {
  // 拼接查询条件
  const userWhereOpts = {};
  if (userName) {
    userWhereOpts.userName = userName;
  }
  if (pageIndex < 0) {
    pageIndex = 0;
  }

  // 执行查询
  const result = await Blog.findAndCountAll({
    limit: pageSize, // 每页多少条
    offset: pageSize * pageIndex, // 跳过多少条
    order: [['id', 'desc']], // 排序
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture'],
        where: userWhereOpts,
      },
    ],
  });

  // result.count 总数，跟分页无关
  // result.rows 查询结果，数组

  // 格式化
  let blogList = result.rows.map((row) => row.dataValues); // row.dataValues 是一个对象
  blogList = formatBlog(blogList);
  blogList = blogList.map((blogItem) => {
    const user = blogItem.user.dataValues; // user 是 blogItem 的一个属性
    blogItem.user = formatUser(user);
    return blogItem;
  });

  return {
    count: result.count,
    blogList,
  };
}

/**
 * 获取关注着的微博列表（首页）
 * @param {Object} param0 查询条件 { userId, pageIndex = 0, pageSize = 10 }
 */
async function getFollowersBlogList({ userId, pageIndex = 0, pageSize = 10 }) {
  const result = await Blog.findAndCountAll({
    limit: pageSize, // 每页多少条
    offset: pageSize * pageIndex, // 跳过多少条
    order: [['id', 'desc']],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture'],
      },
      {
        model: UserRelation,
        attributes: ['userId', 'followerId'],
        where: { userId },
      },
    ],
  });

  // 格式化数据
  let blogList = result.rows.map((row) => row.dataValues);
  blogList = formatBlog(blogList);
  blogList = blogList.map((blogItem) => {
    blogItem.user = formatUser(blogItem.user.dataValues);
    return blogItem;
  });

  return {
    count: result.count,
    blogList,
  };
}

module.exports = {
  createBlog,
  getBlogListByUser,
  getFollowersBlogList,
};

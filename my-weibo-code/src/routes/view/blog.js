/**
 * @description 微博首页 view 路由
 * @author 刘新金
 */

const router = require('koa-router')();
const { loginRedirect } = require('../../middlewares/loginChecks');
const { getProfileBlogList } = require('../../controller/blog-profile');
const { isExist } = require('../../controller/user');
const { getSquareBlogList } = require('../../controller/blog-square');
const { getFans, getFollowers } = require('../../controller/user-relation');

// 首页
router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index', {});
});

// 个人主页
router.get('/profile', loginRedirect, async (ctx, next) => {
  const { userName } = ctx.session.userInfo;
  ctx.redirect(`/profile/${userName}`);
});
router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
  // 已登录用户的信息
  const myUserInfo = ctx.session.userInfo;
  const myUserName = myUserInfo.userName;

  let curUserInfo;
  const { userName: curUserName } = ctx.params;
  const isMe = myUserName === curUserName;
  if (isMe) {
    // 是当前登录用户
    curUserInfo = myUserInfo;
  } else {
    const existResult = await isExist(curUserName);
    if (existResult.errno !== 0) {
      // 用户名不存在
      return;
    }
    // 不是当前登录用户
    curUserInfo = existResult.data;
  }

  const result = await getProfileBlogList(curUserName, 0); // 获取第一页数据
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data;

  // 获取粉丝
  const fansResult = await getFans(curUserInfo.id);
  const { count: fansCount, fansList } = fansResult.data;

  // 获取关注人列表
  const followersResult = await getFollowers(curUserInfo.id);
  const { count: followersCount, followersList } = followersResult.data;

  // 我是否关注了此人
  const amIFollowed = fansList.some((item) => {
    return item.userName === myUserName;
  });

  await ctx.render('profile', {
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count,
    },
    userData: {
      userInfo: curUserInfo,
      isMe,
      fansData: { count: fansCount, list: fansList },
      followersData: { count: followersCount, list: followersList },
      amIFollowed,
    },
  });
});

// 广场
router.get('/square', loginRedirect, async (ctx, next) => {
  const result = await getSquareBlogList(0);
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data;

  await ctx.render('square', {
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count,
    },
  });
});

module.exports = router;

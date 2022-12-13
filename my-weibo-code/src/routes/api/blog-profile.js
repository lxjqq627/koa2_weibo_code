/**
 * @description 个人主页 API 路由
 * @author: 刘新金
 */

const router = require('koa-router')();
const { loginCheck } = require('../../middlewares/loginChecks');
const { getProfileBlogList } = require('../../controller/blog-profile');
const { getBlogListStr } = require('../../utils/blog');

router.prefix('/api/profile');

// 加载更多
router.get('/loadMore/:userName/:pageIndex', loginCheck, async (ctx, next) => {
  let { userName, pageIndex } = ctx.params;
  pageIndex = parseInt(pageIndex);
  const result = await getProfileBlogList(userName, pageIndex);

  result.data.blogListTpl = getBlogListStr(result.data.blogList); // 渲染为html字符串

  ctx.body = result;
});

module.exports = router;

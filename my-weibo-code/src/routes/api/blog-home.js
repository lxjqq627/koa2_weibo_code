/**
 * @description 微博首页api相关的路由
 * @author: 刘新金
 */

const router = require('koa-router')();
const { loginCheck } = require('../../middlewares/loginChecks');
const { create } = require('../../controller/blog-home');
const { genValidator } = require('../../middlewares/validator');
const blogValidate = require('../../validator/blog');

router.prefix('/api/blog');

router.post(
  '/create',
  loginCheck,
  genValidator(blogValidate),
  async (ctx, next) => {
    const { content, image } = ctx.request.body;
    const { id: userId } = ctx.session.userInfo;
    // controller
    ctx.body = await create({ userId, content, image });
  }
);

module.exports = router;

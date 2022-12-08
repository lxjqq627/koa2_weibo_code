const router = require('koa-router')();

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    isMe: false,
    blogList: [
      {
        id: 1,
        title: '标题A',
      },
      {
        id: 2,
        title: '标题B',
      },
      {
        id: 3,
        title: '标题C',
      },
      {
        id: 4,
        title: '标题D',
      },
    ],
  });
});

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json',
  };
});

router.get('/profile/:userName', async (ctx, next) => {
  const { userName } = ctx.params;
  ctx.body = {
    title: 'this is profile pages',
    userName,
  };
});

router.get('/loadMore/:userName/:pageIndex', async (ctx, next) => {
  const { userName, pageIndex } = ctx.params; // get params from urls
  ctx.body = {
    title: 'this is loadMore API',
    userName,
    pageIndex,
  };
});

module.exports = router;

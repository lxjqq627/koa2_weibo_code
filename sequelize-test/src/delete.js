const { User, Blog } = require('./model');

(async function () {
  // // 删除一条博客
  // const delBlogRes = await Blog.destroy({
  //   where: {
  //     id: 4,
  //   },
  // });

  // console.log('delBlogRes', delBlogRes);

  // 删除一个用户
  const delUserRes = await User.destroy({
    where: {
      userName: 'lisi',
    },
  });

  console.log('delUserRes', delUserRes);
})();

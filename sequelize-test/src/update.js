const { User } = require('./model');
(async function () {
  const updateRes = await User.update(
    {
      nickName: '李四2',
    },
    {
      where: {
        userName: 'lisi',
      },
    }
  );
  console.log('updateRes', updateRes[0] > 0);
})();

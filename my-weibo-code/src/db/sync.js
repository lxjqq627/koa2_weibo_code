/**
 * @description sequelize 同步数据库
 * @author 刘新金
 */

const seq = require('./seq');

// require('./model');

// 测试连接
seq
  .authenticate()
  .then(() => {
    console.log('auth ok');
  })
  .catch(() => {
    console.log('auth err');
  });

// 执行同步
seq.sync().then(() => {
  console.log('sync ok');
  process.exit(); // 退出进程
});

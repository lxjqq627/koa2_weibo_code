/**
 * @description 微博数据模型单元测试
 * @author: 刘新金
 */

const { Blog } = require('../../src/db/model/index');

test('微博数据模型各个属性，符合预期', () => {
  // build会构建一个内存的Blog实例，但不会提交到数据库中
  const blog = Blog.build({
    userId: 1,
    content: '微博内容',
    image: '/test.png',
  });
  // 验证各个属性
  expect(blog.userId).toBe(1);
  expect(blog.content).toBe('微博内容');
  expect(blog.image).toBe('/test.png');
});

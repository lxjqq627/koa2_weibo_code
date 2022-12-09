/**
 * 单元测试
 * author: 刘新金
 */

function sum(a, b) {
  return a + b;
}

test('10 + 20 应该等于30', () => {
  const res = sum(10, 20);
  expect(res).toBe(30);
});

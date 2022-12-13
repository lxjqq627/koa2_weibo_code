/**
 * @description 微博数据相关的工具方法
 * @author 刘新金
 */
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

// 获取 blog-list.ejs 的内容
const BLOG_LIST_TPL = fs
  .readFileSync(path.join(__dirname, '..', 'views', 'widgets', 'blog-list.ejs'))
  .toString();

/**
 *  根据 blogList 渲染出 html 字符串
 * @param {Array} blogList
 * @param {Boolean} canReplay
 * @returns
 */
function getBlogListStr(blogList = [], canReplay = false) {
  return ejs.render(BLOG_LIST_TPL, {
    blogList,
    canReplay, // 是否可以回复
  });
}

module.exports = {
  getBlogListStr,
};

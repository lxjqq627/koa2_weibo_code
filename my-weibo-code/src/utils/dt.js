/**
 * @description 时间相关的工具函数
 * @author 刘新金
 */

const { format } = require('date-fns');

/**
 * 格式化时间 如：09.05 17:00
 * @param {string} str
 * @returns
 */
function timeFormat(str) {
  return format(new Date(str), 'yyyy-MM-dd HH:mm');
}

module.exports = {
  timeFormat,
};

/**
 * @description json schema 验证中间件
 * @author: 刘新金
 */

const { ErrorModel } = require('../model/ResModel');
const { jsonSchemaFileInfo } = require('../model/ErrorInfo');

/**
 * 生成 json schema 验证的中间件
 * @param {Function} validateFn
 * @returns
 */
function genValidator(validateFn) {
  // 定义中间件函数
  async function validator(ctx, next) {
    // 校验
    const data = ctx.request.body;
    const error = validateFn(data);
    if (error) {
      ctx.body = new ErrorModel(jsonSchemaFileInfo);
      return;
    }
    // 校验成功，继续
    await next();
  }
  return validator;
}
module.exports = {
  genValidator,
};

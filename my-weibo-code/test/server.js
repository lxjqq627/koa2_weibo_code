/**
 * @description server test
 * @author 刘新金
 */

const request = require('supertest'); // 测试框架
const server = require('../src/app').callback(); // koa2 的写法

module.exports = request(server);

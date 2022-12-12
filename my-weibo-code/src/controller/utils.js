/**
 * @description utils controller
 * @author: 刘新金
 */
const path = require('path');
const { uploadFileSizeFailInfo } = require('../model/ErrorInfo');
const { ErrorModel, SuccessModel } = require('../model/ResModel');
const fse = require('fs-extra');

const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles');
const MAX_SIZE = 1024 * 1024 * 1024; // 1M

// 是否需要创建目录
fse.pathExists(DIST_FOLDER_PATH).then((exist) => {
  if (!exist) {
    fse.ensureDir(DIST_FOLDER_PATH);
  }
});

/**
 * 保存文件
 * @param {string} name 文件名
 * @param {string} type 文件类型
 * @param {number} size 文件大小
 * @param {string} filePath 文件路径
 */
async function saveFile({ name, type, size, filePath }) {
  if (size > MAX_SIZE) {
    await fse.remove(filePath); // 删除文件
    return new ErrorModel(uploadFileSizeFailInfo);
  }

  // 移动文件
  const fileName = Date.now() + '.' + name; // 防止重名
  const distFilePath = path.join(DIST_FOLDER_PATH, fileName); // 目标文件路径
  await fse.move(filePath, distFilePath); // 移动文件

  // 返回信息
  return new SuccessModel({
    url: '/' + fileName,
  });
}

module.exports = {
  saveFile,
};

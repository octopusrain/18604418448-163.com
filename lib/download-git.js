const { promisify } = require("util");
module.exports.clone = async function(repo, target) {
  const download = promisify(require("download-git-repo"));
  const ora = require("ora"); // 进度条
  const process = ora(`下载...${repo}`); // 实力化
  process.start();
  await download(repo, target);
  process.succeed();
};

const shell = require("shelljs");
// repo 下载的地址，desc下载放入的文件
module.exports.clone = async (repo, desc) => {
  //const download = promisify(require("download-git-repo")); // 下载git 地址
  const ora = require("ora"); // 进度条
  const process = ora(`下载...${repo}`);
  shell.mkdir(desc);
  shell.cd(desc);
  process.start();
  shell.exec(`git clone https://github.com/${repo}`, (stdout, stderr) => {
    process.succeed();
  });
};

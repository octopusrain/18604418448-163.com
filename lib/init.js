const { promisify } = require("util");
const figlet = promisify(require("figlet"));
//const { clone } = require("./download"); // use shelljs 有问题待解救
const { clone } = require("./download-git"); // use git-repo
const open = require("open");
const clear = require("clear");
const chalk = require("chalk");
const log = msg => console.log(chalk.green(msg));
module.exports = async name => {
  // 清空界面
  clear();
  const data = await figlet("webcome to my world");
  log(data);
  // 克隆项目
  await clone("github:su37josephxia/vue-template", name);
  // 安装依赖
  await spawn("npm", ["install"], { cwd: `./${name}` });
  log(`
  ========
  ========
  成功
    `);
  // 打开浏览器
  open("http://localhost:8080"); // 要放在前面，因为下面执行了会阻断终端执行
  await spawn("npm", ["run", "serve"], { cwd: `./${name}` });
};

// 将子进程封装成一个promise
async function spawn(...args) {
  const { spawn } = require("child_process");
  return new Promise(resolve => {
    const proc = spawn(...args); // 子进程
    proc.stdout.pipe(process.stdout); // 输出流倒入到主进程
    proc.stderr.pipe(process.stderr); // 输出错误流倒入到主进程
    proc.on("close", () => {
      resolve();
    });
  });
}

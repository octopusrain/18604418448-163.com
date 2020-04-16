const fs = require("fs");
const handlebars = require("handlebars"); // 处理模版文件
const chalk = require("chalk");
module.exports = async function() {
  // 获取页面列表
  const pageList = fs
    .readdirSync("./src/views")
    .filter(file => file !== "Home.vue") // 过滤掉home。vue
    .map(file => ({
      file,
      name: file.replace(".vue", "").toLocaleLowerCase()
    }));
  // 生成路由定义
  compile({ pageList }, "./src/router.js", "./template/router.js.hbs");
  // 生成菜单
  compile({ pageList }, "./src/App.vue", "./template/App.vue.hbs");

  /**
   * 编译模版文件
   * @param source 目标数据源 pageList
   * @param filePath 目标文件路径 route。js
   * @param templatePath 模版文件路径 route。js。hbs
   */
  function compile(source, filePath, templatePath) {
    if (fs.existsSync(templatePath)) {
      const content = fs.readFileSync(templatePath).toString(); // 获取模版文件
      console.log(content);
      const result = handlebars.compile(content)(source); // 编译模版文件
      fs.writeFileSync(filePath, result); // 将编译的模版文件写入目标文件
      console.log(chalk.green(`${filePath} 创建成功`));
    } else {
      console.log(chalk.red("invilad templatePath"));
    }
  }
};

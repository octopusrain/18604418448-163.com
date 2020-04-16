#!/usr/bin/env node
// 创建bin npm link 建立软链
const program = require("commander");
const { clone } = require("../lib/download");
program.version(require("../package.json").version);
program
  .command("init <name>")
  .description("init project")
  .action(name => {
    require("../lib/init")(name);
  });
program
  .command("refresh")
  .description("auto add router")
  .action(() => {
    require("../lib/refresh")();
  });
program.parse(process.argv);

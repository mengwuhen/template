const fs = require("fs");
// const {} = require("lodash")
console.log("__dirname : " + __dirname); // 返回运行文件所在的目录
// console.log("resolve   : " + resolve("./")); // 当前命令所在的目录
// console.log("cwd       : " + process.cwd()); // 当前命令所在的目录

const os = require("os");
const homedir = os.homedir();
console.log("homedir", homedir);

// 创建目录
fs.open(`${homedir}/Desktop/fundImage`, "r", (err, fd) => {
  if (err) {
    //创建目录
    fs.mkdirSync(`${homedir}/Desktop/fundImage`, { recursive: true }, (err) => {
      if (err) throw err;
    });
  }
});

// 移动图片

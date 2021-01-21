// 获取rank 排名
const phantom = require("phantom");
const fs = require("fs");
const os = require("os");
const path = require("path");

const homedir = os.homedir();
let dirPath = `${homedir}/Desktop/fundImage`;

// 读取目录
fs.readdir(dirPath, function (err, files) {
  if (err) {
    fs.mkdir(dirPath, function (err) {
      if (err) {
        console.log("err");
      }
    });
  }
});

// let str =
//   "519674,161028,501016,007490,002621,217016,001594,009869,040008,007343,009995,070032,001869,161706,001633,519069,000513,006769,200012,001677,000572,008791,360013,000333";
let str = "001749";
(async function () {
  let array = str.split(",");
  for (let num = 0; num < array.length; num++) {
    const instance = await phantom.create();
    const page = await instance.createPage();
    // await page.on("onResourceRequested", function (requestData) {
    //   // console.info("Requesting", requestData.url);
    // });
    let status = await page.open(
      `https://www.dayfund.cn/fundinfo/${array[num]}.html`
    );
    console.log(array[num], status);
    if (status) {
      await page.evaluate(function () {
        document.body.style.backgroundColor = "#fff";
      });
      await page.property("viewportSize", {
        width: 1680,
        height: 1050,
      });
      await page.property("clipRect", {
        top: 460,
        left: 240,
        width: 892,
        height: 274,
      });
      await page.render(`${homedir}/Desktop/fundImage/${array[num]}-rank.png`);

      // 将生成的图片保存到image目录，没有目录则在桌面创建目录并将图片存入image目录，如果有则直接放入

      // 退出
      await instance.exit();
    } else {
      console.log("页面加载失败");
    }
  }
})();

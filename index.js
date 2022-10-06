import { exec, __dirname, adb } from "./utils.js"
import { emptyDir, outputFile, mkdirp } from "fs-extra"
import { join } from "path"
console.log(__dirname);

const pullApk = async (_path) => {//由于try catch的限制，所以应把这一步单独提取出来
    try {
        let dirName = _path.slice(45).replace(/-.+/, "");
        let path = _path.replace("package:", "");
        console.log(`pull ${path} to ${dirName}`);
        await exec(`mkdir ${join(__dirname, "out", dirName)}`);
        return await adb(["pull", path, join(__dirname, "out", dirName, "base.apk")]);
    } catch (error) {
        console.error(`寄在：${_path}`);
        console.error(`寄因：${error}`);
    }
}

(async () => {
    try {
        const packTypeReg = /\/base.apk/;//大 道 至 简（其实是我写不出更好的了，正则有的时候确实难）
        //await exec("cls");//假的，这是新建一个shell，屁用没有，可能execFile可以，但是我懒（更新，execFile也不行，没必要，重写exec了）
        await exec("chcp 65001");//重生之我在node用system();似乎在出错时会把新建shell中的输出打印出来，所以还是有必要的
        let packNames = String.prototype.split.call(await exec("adb shell pm list packages"), "package:");
        packNames.shift();//不知道为什么，第一个元素为空
        let pullEvents = [], tempArr = [];
        for (let item in packNames) tempArr.push(exec(`adb shell pm path ${packNames[item]}`));//god bless promise.all
        tempArr = await Promise.all(tempArr);
        await emptyDir("out");//清空一个文件夹，但好像时灵时不灵
        tempArr.forEach(element => {
            let temp = element.replace(/package.+\/split[\w\_\.]+apk/gs, "");//去掉提取过安装包的应用的其他文件，可能是其他构架包
            if (packTypeReg.test(temp)) pullEvents.push(pullApk(temp));//将一个promise对象传入数组，这是我在本项目中学到的做重要的知识点
        });
        let result = [];//await Promise.all(pullEvents);//这里adb pull一直失败，试试一个一个来
        pullEvents.forEach(async item => {
            if ((typeof item) == "function") {
                result.push(await item());
            } else {
                console.log(item);
            }
        });//还是不行，重写exec吧
        await outputFile("temp.txt", result.toString());
    } catch (error) {
        console.error(error);
    }
})();
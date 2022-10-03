import { exec, forMap } from "./shell.js"
import { outputFile } from "fs-extra"

class 

(async () => {
    try {
        const packTypeReg = /\/base.apk/;
        //await exec("cls");//假的，这是新建一个shell，屁用没有，可能execFile可以，但是我懒
        await exec("chcp 65001");//重生之我在node用system();似乎在出错时会把新建shell中的输出打印出来，所以还是有必要的
        let packNames = String.prototype.split.call(await exec("adb shell pm list packages"), "package:");
        packNames.shift();
        let packPath = [], tempArr = [], temp;
        for (let item of packNames) {
            tempArr.push(exec(`adb shell pm path ${item}`));
        }
        tempArr = await Promise.all(tempArr);
        tempArr.forEach(element => {
            temp = element.replace(/package.+\/split[\w\_\.]+apk/gs, "");
            if(packTypeReg.test(temp))packPath.push(temp);
        });
        await outputFile("temp.txt", packPath.toString());
    } catch (error) {
        console.error(error);
    }
})();
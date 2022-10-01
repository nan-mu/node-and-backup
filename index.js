import { exec } from "./shell.js"
import { outputFile } from "fs-extra"

(async () => {
    try {
        await exec("chcp 65001");//重生之我在node用system();
        const packageNames = String.prototype.split.call(await exec("adb shell pm list packages"), "package:");
        packageNames.shift();
        //await outputFile("temp.txt", packageNames.toString());
        for(let item in packageNames){
            console.log(await exec(`adb shell pm path ${packageNames[item]}`));
        }
    } catch (error) {
        console.error(error);
    }
})();

import fs from "fs-extra"

(async () => {
    await shell("chcp 65001");
    await shell("cls");
    let answer = shell.exec("adb shell pm list packages", { async: true });
    answer.stdout.on("data", async (data) => {
        await fs.outputFile("temp.txt", data);
    });
})();
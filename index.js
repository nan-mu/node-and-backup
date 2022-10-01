import { exec } from "./shell.js"
import fs from "fs-extra"

(async () => {
    try {
        await exec("chcp 65001");
        console.log(await exec("echo 在？ ?"));
    } catch (error) {
        console.error(error);
    }
})();
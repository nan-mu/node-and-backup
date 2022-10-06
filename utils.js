import child_process from 'child_process';
import url from "node:url";
import path from "node:path";

Object.defineProperty(global, "getDirName", {
    get() {
        return (importMetaUrl) => {
            return path.dirname(url.fileURLToPath(importMetaUrl));
        };
    },
    enumerable: true,
    configurable: false,
    // writable: false,
});

const __dirname = global.getDirName(import.meta.url);

const adb = (com) => {
    return new Promise((res, rej) => {
        var spawn = child_process.spawn;
        var child = spawn("adb", [...com]);
        child.stderr.on('data', function (data) {
            console.error("STDERR:", data.toString());
            rej(data.toString());
        });
        child.stdout.on('data', function (data) {
            console.log("STDOUT:", data.toString());
            res(data.toString());
        });
    });
}

const exec = (com, type = "async") => {//简单封装一下
    if (type == "async") {
        return new Promise((resolve, reject) => {
            child_process.exec(com, (error, stdout, stderr) => {
                if (error) {
                    console.error('error: ' + error);
                    reject(stderr);
                } else {
                    resolve(stdout);
                }
            });
        });
    } else if (type == "file") {
        child_process.execFile(com, function (error, stdout, stderr) {
            if (error) {
                console.error('error: ' + error);
                return stderr;
            } else {
                return stdout;
            }
        });
    }
}

export { exec, __dirname, adb };
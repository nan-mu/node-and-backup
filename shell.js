import { exec } from "shelljs";

export const shell = (com) => {
    return new Promise((resolve, reject) => {
        let child = exec(com, { async: true });
        child.stdout.on('data', function (data) {
            resolve(data);
        });
    })
}
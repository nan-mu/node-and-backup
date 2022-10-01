import child_process from 'child_process';

var exec = (com) => {//简单封装一下
    return new Promise((resolve, reject) => {
        child_process.exec(com, function (error, stdout, stderr) {
            if (error) {
                console.error('error: ' + error);
                reject(stderr);
            }else{
                resolve(stdout);
            }
        });
    });
}

export { exec };
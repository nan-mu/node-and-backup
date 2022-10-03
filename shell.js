import child_process from 'child_process';

const exec = (com, type = "async") => {//简单封装一下
    if(type == "async"){
        return new Promise((resolve, reject) => {
            child_process.exec(com, (error, stdout, stderr)=>{
                if (error) {
                    console.error('error: ' + error);
                    reject(stderr);
                }else{
                    resolve(stdout);
                }
            });
        });
    }else if(type == "sync"){
        child_process.exec(com, function (error, stdout, stderr) {
            if (error) {
                console.error('error: ' + error);
                return stderr;
            }else{
                return stdout;
            }
        });
    }
}

const forMap = (arr, fun)=>{
    return new Promise((res) => {
        arr.map(item => {
            fun(item);
        });
        res();
    });
}

export { exec, forMap };
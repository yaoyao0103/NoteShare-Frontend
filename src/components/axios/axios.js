import _axios from "axios"

const axios = (baseURL) => {
    //建立一個自定義的axios
    const instance = _axios.create({
            baseURL: baseURL || 'http://54.95.183.197:8080', //JSON-Server端口位置
            timeout: 20000,
        });

    return instance;
}

export {axios};
export default axios();
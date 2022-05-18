import Taro from '@tarojs/taro'
import getBaseUrl from './baseUrl'
import interceptors from './interceptors'
import { deepClone } from '@/utils'
import { CONSTANTS } from './config'
import session from './session'


interceptors.forEach(interceptorItem => Taro.addInterceptor(interceptorItem))

class httpRequest {

    baseOptions(params, method = "GET") {
        let { url, data } = params;
        const newData = deepClone(data)
        const BASE_URL = getBaseUrl(url);
        let contentType = CONSTANTS.CONTENT_TYPE_VALUE;
        contentType = params.contentType || contentType;
        const token = session.get(CONSTANTS.SESSION_KEY)
        const Authorization = token ? `Bearer ${token}` : ''
        const option = {
            url: BASE_URL + url,
            data: newData,
            method: method,
            timeout: 10000,
            header: {
                'content-type': contentType,
                // 获取token
                'Authorization': Authorization
            }
        };
        return Taro.request(option);
    }

    get(url, data = "") {
        let option = { url, data };
        return this.baseOptions(option);
    }

    post(url, data, contentType) {
        let params = { url, data, contentType };
        return this.baseOptions(params, "POST");
    }

    put(url, data = "") {
        let option = { url, data };
        return this.baseOptions(option, "PUT");
    }

    delete(url, data = "") {
        let option = { url, data };
        return this.baseOptions(option, "DELETE");
    }

}

export default new httpRequest()



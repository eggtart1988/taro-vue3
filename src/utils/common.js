import Taro, { getCurrentPages, navigateTo, switchTab, redirectTo, reLaunch } from '@tarojs/taro'

/*获取当前页url*/
export const getCurrentPageUrl = () => {
    let pages = getCurrentPages()
    let currentPage = pages[pages.length - 1]
    let url = currentPage.route
    return url
}

// 跳转至登录页
export const pageToLogin = () => {
    let path = getCurrentPageUrl()
    if (!path.includes('login')) {
        navigateTo({
            url: '/pages/login/index',
        })
    }
}

// 跳转到首页
export const pageToHome = () => {
    let path = getCurrentPageUrl()
    if (!path.includes('index')) {
        navigateTo({
            url: '/pages/index/index',
        })
    }
}

export const navigateBack = async (delta = 1) => {
    try {
        const success = await Taro.navigateBack({ delta })
        return Promise.resolve(success)
    } catch (error) {
        pageToHome()
        console.log(error);
        return Promise.reject(error)
    }
}

export const toUrl = (obj) => {
    let arr = [];
    if (obj && typeof obj === 'object') {
        for (let i in obj) {
            arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]));
        }
    }
    return arr.join('&');
}

/**
 * 跳转路由
 * @param {*} param0 
 */
export const navigateToUrl = async ({ url, data }) => {
    const params = data ? `?${toUrl(data)}` : ''
    // TODO 补充路由封装参数
    try {
        const success = await navigateTo({
            url: url + params
        })
        return Promise.resolve(success)
    } catch (error) {
        console.log(error);
        pageToHome()
        return Promise.reject(error)
    }
}

export const switchTabUrl = async ({ url }) => {
    try {
        const success = await switchTab({
            url
        })
        return Promise.resolve(success)
    } catch (error) {
        console.log(error);
        pageToHome()
        return Promise.reject(error)
    }
}

export const redirectToUrl = async ({ url, data }) => {
    const params = data ? `?${toUrl(data)}` : ''
    try {
        const success = await redirectTo({
            url: url + params
        })
        return Promise.resolve(success)
    } catch (error) {
        console.log(error);
        pageToHome()
        return Promise.reject(error)
    }
}

export const reLaunchUrl = async ({ url, data }) => {
    const params = data ? `?${toUrl(data)}` : ''
    try {
        const success = await reLaunch({
            url: url + params
        })
        return Promise.resolve(success)
    } catch (error) {
        console.log(error);
        pageToHome()
        return Promise.reject(error)
    }
}
export const getStorageData = async (key) => {
    let result;
    try {
        const { data } = await Taro.getStorage({ key });
        result = data;
    } catch (error) {
        console.log(error);
    }
    return result;
};

export const chooseLocation = async () => {
    try {
        const res = await Taro.chooseLocation();
        return Promise.resolve(res)
    } catch (error) {
        console.log(error);
        return Promise.reject(error)
    }
};

/**
 * toast 提示
 * @param {*} title
 */
export const showToast = (title, icon = 'none', mask = false) => {
    Taro.showToast({
        title,
        mask,
        icon: icon,
        duration: 2000,
    }).then(r => r)
};

/**
 * loading
 * @param {*} title
 * @param {*} mask
 */
export const showLoading = (title = '加载中...', mask = false) => {
    Taro.showLoading({
        title,
        mask
    }).then(r => r)
};

export const hideLoading = () => {
    Taro.hideLoading()
};

/**
 * 选择图片
 * @param {*} num 
 * @param {*} length 
 * @param {*} sizeType 
 * @param {*} sourceType 
 * @returns 
 */
export const chooseImage = (
    num, // 最大选择数
    length = 0, // 已选数量
    sizeType = ['compressed'],
    sourceType = ['album', 'camera']
) => {
    return new Promise((resolve, reject) => {
        Taro.chooseImage({
            count: num - length,
            sizeType,
            sourceType
        })
            .then(response => {
                resolve(response)
            }, err => {
                reject(err)
            });
    })
}

/**
 * 选择视频
 * @param {*} sourceType 
 * @param {*} maxDuration 
 * @param {*} compressed 
 * @returns 
 */
export const chooseVideo = (
    sourceType = ['camera', 'album'],
    maxDuration = 60,
    compressed = true
) => {
    return new Promise((resolve, reject) => {
        Taro.chooseVideo({
            sourceType,
            maxDuration,
            compressed,
            success: (res) => {
                if (res.duration > maxDuration) return showToast(`视频时长超过${maxDuration}s，请重新选择`)
                resolve(res)
            }
        })
    })
}

export const uploadFiles = async (
    { data = '',
        url = process.env.IMG_URL,
        fileType = "image",
        fileName = "file" }
) => {

    try {
        const res = await my.uploadFile({
            url,
            filePath: data,
            fileType,
            fileName,
        });
        if (res.statusCode !== 200) {
            showToast('文件上传失败');
            return Promise.reject(res)
        }
        const jsonStr = JSON.parse(res.data)
        return Promise.resolve(jsonStr)
    } catch (error) {
        console.log(error);
        return Promise.reject(error)
    }

}

/**
 * 上传图片到服务器
 * @param {*} data 
 * @param {*} type 
 * @param {*} url 
 * @param {*} fileType 
 * @returns 
 */
export const uploadFile = (
    data,
    type,
    url,
    fileType = 'IMG'
) => {
    return new Promise((resolve, reject) => {
        Taro.uploadFile({
            url,
            filePath: data,
            name: 'file',
            header: {

            },
            formData: {
                'fileType': fileType,
                'type': type
            },
            success: (res) => {
                if (res.statusCode !== 200) {
                    showToast('文件上传失败');
                    reject(res)
                    return
                }
                const jsonStr = JSON.parse(res.data)
                resolve(jsonStr)
            },
            fail: (res) => {
                reject(res)
            }
        });
    })
}

/**
 * 拨打电话
 * @param {*} number 
 */
export const makePhoneCall = async (number) => {
    try {
        const res = await Taro.makePhoneCall({
            phoneNumber: number
        })
        return Promise.resolve(res)
    } catch (error) {
        console.log(error);
        return Promise.reject(error)
    }
}

/**
 * 用户授权状态
 * @param {*} type 
 * @returns 
 */
export const getSetting = (type) => {
    return new Promise((resolve, reject) => {
        Taro.getSetting({
            success: (res) => {
                let recordAuth = res.authSetting[type];
                resolve(recordAuth)
            },
            fail: function () {
                showToast('error', '鉴权失败，请重试')
            }
        })
    })
}

/**
 * promise 模态框
 * @param {*} title 
 * @param {*} content 
 * @param {*} showCancel 
 * @param {*} confirmText 
 * @param {*} cancelText 
 * @returns 
 */
export const showModal = (content, title = '提示', showCancel = false, confirmText = '确定', cancelText = '取消') => {
    return new Promise((resolve, reject) => {
        Taro.showModal({
            title,
            content,
            showCancel,
            cancelText,
            confirmText,
            success: (success) => {
                resolve(success)
            },
            fail: (error) => {
                reject(error)
            }
        })
    })
}


/**
 * 滚动到相应位置
 * @param {*} scrollTop 
 * @param {*} duration 
 */
export const pageScrollTo = (scrollTop, duration) => {
    Taro.pageScrollTo({
        scrollTop,
        duration
    })
}


// num为传入的值，n为保留的小数位
export const formatFloat = (num, n) => {
    let f = parseFloat(num);
    if (Number.isNaN(f)) {
        return false;
    }
    f = Math.round((num) * Math.pow(10, n)) / Math.pow(10, n); // n 幂
    return f;
};

/**
 * @description 深拷贝
 * @param {*} obj 目标对象
 * @return {*} 返回的深拷贝对象
 */
export const deepClone = (obj) => {
    if (!obj || typeof obj !== 'object') {
        return obj
    }
    let objArray = Array.isArray(obj) ? [] : {}
    if (obj && typeof obj === 'object') {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                // 如果obj的属性是对象，递归操作
                if (obj[key] && typeof obj[key] === 'object') {
                    objArray[key] = deepClone(obj[key])
                } else {
                    objArray[key] = obj[key]
                }
            }
        }
    }
    return objArray
}
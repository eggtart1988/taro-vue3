import request from "@/servers"

/**
 * 在组件中可以直接导入使用
 */
export const save = (data) => {
    return request.post('/shop/', data)
}
import { ElMessage, type UploadProps } from 'element-plus';

// 检查图片是否合法
// 检查内容包括图片格式以及大小
export const formatChecker: UploadProps['beforeUpload'] = rawFile => {
    if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
        ElMessage.error('头像必须为jpg或png格式!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 5) {
        ElMessage.error('头像不能超过5mb!')
        return false
    }
    return true
}

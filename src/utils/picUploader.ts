import { ElMessage, type UploadProps } from 'element-plus';

export const formatChecker: UploadProps['beforeUpload'] = rawFile => {
    if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
        ElMessage.error('头像必须为jpg或png格式!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('头像不能超过2mb!')
        return false
    }
    return true
}

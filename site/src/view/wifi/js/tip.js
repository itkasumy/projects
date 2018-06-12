if (!String.prototype.padStart) {
    String.prototype.padStart = function (targetLength, padString) {
        targetLength = targetLength>>0
        padString = String(padString || ' ')
        if (this.length > targetLength) {
            return String(this)
        } else {
            targetLength = targetLength - this.length
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength/padString.length)
            }
            return padString.slice(0, targetLength) + String(this)
        }
    }
}

/**
 * 处理数据请求时的错误
 * @param {vue实例，用于发起提示框} that 
 * @param {异常对象} e 
 */
export const errorException = (context, e, nocatchDesc = '请检查您的网络是否异常！') => {
    e = e || {}
    if (e.response) {
        if (e.response.data.message) {
            context.$message({
                type: 'error',
                message: e.response.data.message,
                showClose: true
            })
        }else {
            context.$message({
                type: 'error',
                message: '服务器异常！',
                showClose: true
            })
        }
    } else {
        context.$message({
            type: 'error',
            message: nocatchDesc,
            showClose: true
        })
    }
}
export const successTip = (context, msg = '操作成功！')=>{
    context.$message({
        showClose: true,
        message: msg,
        type: 'success'
      });
}
export const errorTip = (context, msg = '操作失败！')=>{
    context.$message({
        showClose: true,
        message: msg,
        type: 'error'
      });
}

export const confirmModal = (context, msg = '您确定进行此操作？')=>{
    return context.$confirm(msg, '提示', {
       confirmButtonText: '确定',
       cancelButtonText: '取消',
       type: 'warning',
       center: true
     })
 }


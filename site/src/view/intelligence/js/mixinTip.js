import {errorException, successTip, errorTip, confirmModal} from './tip'
export const Tip = {
  methods: {
    mCatchException(e, nocatchDesc = '请检查您到网络是否异常！'){
      return errorException(this, e, nocatchDesc)
    },
    mSuccessTip(msg='操作成功'){
      return successTip(this, msg)
    },
    mErrorTip(msg = '操作失败！'){
      return errorTip(this, msg)
    },
    mConfirmModal(msg = '您确定进行此操作？'){
      return confirmModal(this, msg)
    },
  }
}
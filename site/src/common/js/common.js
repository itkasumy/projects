
import Vue from 'vue'

const bus = new Vue()

//默认导出只能导出一次
export default bus

//按需导出
export const ISLOGIN = "test"
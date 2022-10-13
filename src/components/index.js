import PageTools from './PageTools'
import UploadExcel from './UploadExcel'

export default {
  install(Vue) {
    // 这里填充的逻辑会被执行
    Vue.component('PageTools', PageTools) // 注册工具栏组件
    Vue.component('UploadExcel', UploadExcel) // 注册导入excel组件
  }
}


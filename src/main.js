import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './themes/global.less'

import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import ECharts from 'vue-echarts'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import vuescroll from '@/plugins/vuescroll-native'

import backend from './backend/resources'

Vue.use(vuescroll, {
  ops: {
    rail: {
      background: '#FAFAFA',
      opacity: 0,
      size: '8px',
      specifyBorderRadius: false,
      gutterOfEnds: null,
      gutterOfSide: '2px',
      keepShow: false
    },
    bar: {
      showDelay: 500,
      background: '#FAFAFA',
      opacity: 0.8,
      specifyBorderRadius: false,
      size: '8px'
    }
  }
})

Vue.config.productionTip = false
Vue.prototype.$backend = backend

Vue.component('v-chart', ECharts)
Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

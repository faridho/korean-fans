import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from '@/plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'
import CKEditor from '@ckeditor/ckeditor5-vue'

Vue.config.productionTip = false
Vue.use({ iconfont: 'mdi' }, CKEditor)

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from '@/plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'
import CKEditor from '@ckeditor/ckeditor5-vue'

//firebase
import * as firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCGDDOc2SGmiORikIAkPQfR_CyC72fXJh8",
  authDomain: "faridho-s-project.firebaseapp.com",
  databaseURL: "https://faridho-s-project.firebaseio.com",
  projectId: "faridho-s-project",
  storageBucket: "faridho-s-project.appspot.com",
  messagingSenderId: "938482721225",
  appId: "1:938482721225:web:c211d5b1ec1d7567c04818",
  measurementId: "G-PQEPFQ70WN"
}
try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization error raised", err.stack);
  }
}
firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user)
});

Vue.config.productionTip = false
Vue.use({ iconfont: 'mdi' }, CKEditor)

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

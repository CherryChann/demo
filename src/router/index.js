import Vue from 'vue'
import Router from 'vue-router'
import Vuetify from 'vuetify'
import 'babel-polyfill'
import Vuex from 'vuex'
import Demo from '@/components/demo/index'
import 'vuetify/dist/vuetify.min.css'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(Router)
Vue.use(Vuetify)
Vue.use(Vuex)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'domain',
      component: Demo
    }
  ]
})

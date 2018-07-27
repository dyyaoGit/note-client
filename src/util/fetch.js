import axios from 'axios'
import Vue from 'vue'

let env = process.env.NODE_ENV == 'development' ? '开发环境': '生产环境'

let instance = axios.create({
  baseURL: process.env.NODE_ENV == 'development' ? '/api' : '/'
})

Vue.prototype.$axios = instance;



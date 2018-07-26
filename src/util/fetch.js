import axios from 'axios'
import Vue from 'vue'

console.log(process.env)
let instance = axios.create({
  baseUrl: "/api"
})

Vue.prototype.$axios = instance;

export default instance;

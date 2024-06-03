import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import menu from './modules/menu'
import { trackPresence } from '@/api/user'
import { setToken } from '@/utils/auth'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isUserLoggedIn: false,
    heartbeatIntervalId: null
  },
  mutations: {
    setUserLoggedIn(state, value) {
      state.isUserLoggedIn = value
      if (value && !state.heartbeatIntervalId) {
        this.dispatch('sendHeartbeat')
        state.heartbeatIntervalId = setInterval(() => {
          // 这里可以触发发送心跳的action
          this.dispatch('sendHeartbeat')
        }, 300000) // 每5分钟发送一次心跳
      } else if (!value && state.heartbeatIntervalId) {
        clearInterval(state.heartbeatIntervalId)
        state.heartbeatIntervalId = null
      }
    }
  },

  actions: {
    sendHeartbeat({ commit, state }) {
      // alert('发送心跳请求');
      // 发送心跳请求到后端

      trackPresence({ userId: state.userId }).then(response => {
        if (response.code) {
          setToken(response.data)
        }
      })
        .catch(error => {
          console.error('心跳发送失败:', error)
        })
      // this.$axios.post('/api/auths/track-presence', { userId: state.userId })
      //   .then(response => {
      //   })
      //   .catch(error => {
      //     console.error('心跳发送失败:', error);
      //   });
    },
    loginUser({ commit }, userData) {
      // 登录逻辑，这里简化处理，实际应包含登录请求
      // 假设登录成功后设置用户登录状态
      commit('setUserLoggedIn', true)
      // 设置用户ID到state，具体获取方式根据实际情况调整
      commit('setUserId', userData.id)
    },
    logoutUser({ commit }) {
      commit('setUserLoggedIn', false)
    }
  },
  getters: {
    isLoggedIn: state => state.isUserLoggedIn
  },
  modules: {
    app,
    settings,
    user,
    menu
  },
  getters
})

export default store

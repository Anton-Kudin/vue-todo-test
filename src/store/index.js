import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notices: null
  },
  mutations: {
    setNotices(state, notices) {
      state.notices = notices
    },
  },
  actions: {
    loadNotices(state) {
      let notices = JSON.parse(localStorage.getItem('notices')) || null
      state.commit('setNotices', notices)
    },
    removeNotice({commit, state}, id) {
      let newNotices = state.notices.filter(element => element.id !== id)
      if (newNotices.length) {
        localStorage.setItem("notices", JSON.stringify(newNotices))
      } else {
        localStorage.removeItem("notices")
        newNotices = null
      }
      commit('setNotices', newNotices)
    },
    newNotice({ commit, state }, notice) {
      let data = state.notices || null
      let id = 1
      data ? id = data[data.length - 1].id + 1 : data = []

      data.push({
        id,
        title: notice.title,
        todos: notice.todos.length ? notice.todos : null,
      })

      localStorage.setItem("notices", JSON.stringify(data))
      commit("setNotices", data)
    },
    editNotice({ commit, state }, notice) {
      let data = state.notices
      for (let i = 0; i < data.length; i++) {
        if (data[i].id == notice.id) {
          data[i] = {...notice}
        }
      }
      localStorage.setItem("notices", JSON.stringify(data))
      commit("setNotices", data)
      
    }
  },
  getters: {
    getNotices(state) {
      return state.notices
    },
    getNotice: state => id => {
      return state.notices.find( item => item.id == id)
    }
  }
})

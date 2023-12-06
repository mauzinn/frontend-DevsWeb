import { createStore } from 'vuex'

export default createStore({
  state: {
    email: '',
    name: '',
    about: '',
    id: '',
    room: '0',
    contacts: [],
    MENU: false,
    NewRoom: false
  },
  getters: {
  },
  mutations: {
    SET_ID(state, data) {
      state.id = data
    },
    SET_DATA_USER(state, data) {
      state.name = data.name
      state.about = data.about,
      state.email = data.email
    },
    SET_ROOM(state, room) {
      state.room = room
      state.NewRoom = true
    },
    IN_ROOM(state, status) {
      state.NewRoom = status
    },
    MENU(state, status) {
      state.MENU = status
    }
  },
  actions: {
  },
  modules: {
  }
})

export const SET_USER = 'SET_USER'
const state = JSON.parse(sessionStorage.getItem('user')) || {}
const mutations = {
  [SET_USER] (state, user) {
    sessionStorage.setItem('user', JSON.stringify(user))
    Object.assign(state, user)
  }
}
const actions = {
  [SET_USER] ({
    commit
  }, user) {
    commit(SET_USER, user)
  }
}
export default {
  state,
  mutations,
  actions
}

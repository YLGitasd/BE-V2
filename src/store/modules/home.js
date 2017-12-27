export const CLICK_MENU = 'CLICK_MENU'
const state = {
  name: 'home'
}
const mutations = {
  [CLICK_MENU] (state, menu) {
    state.name = menu.name
  }
}
export default {
  mutations,
  state
}

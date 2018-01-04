import Vue from 'vue'
import Vuex from 'vuex'
/*
* import * as actions from './actions'
*import * as getters from './getters'
*/
import products from './modules/products'
import world from './modules/world'
import home from './modules/home'
import property from './modules/property'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
 /* actions,
  getters,
  */
  modules: {
    products,
    home,
    world,
    property
  },
  strict: debug
})

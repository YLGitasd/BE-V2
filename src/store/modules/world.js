import api from '../api'
export const TAB_MENU_SELECT = 'TAB_MENU_SELECT'
export const GET_CHIN_OPTIONS = 'GET_CHIN_OPTIONS'
export const SET_CHIN_SELECT = 'SET_CHIN_SELECT'
export const SET_TABLE_DATA = 'SET_TABLE_DATA'
const state = {
  params: {
    name: 'concern',
    dateTime: api.formaterDate(Date.now() - 8.64e7, 'YYYY-MM-DD'),
    productStyle: '牛仔裤',
    attribute: '热搜搜索词',
    extraShown: '热销排名',
    timeLen: 7
  },
  chinOptions: [],
  tableData: {
    tableTitle: [],
    tableBody: [],
    tableTotal: 0
  }
}
const mutations = {
  [TAB_MENU_SELECT] (state, option) {
    state.params.name = option.name
  },
  [GET_CHIN_OPTIONS] (state, options) {
    state.chinOptions = options
  },
  [SET_CHIN_SELECT] (state, select) {
    switch (select.name) {
      case 'productStyle':
        state.params.productStyle = select.value
        break
      case 'attribute':
        state.params.attribute = select.value
        break
      case 'extraShown':
        state.params.extraShown = select.value
        break
      case 'timeLen':
        state.params.timeLen = select.value
        break
      default:
        state.params.dateTime = select.value
    }
  },
  [SET_TABLE_DATA] (state, data) {
    state.tableData.tableTitle = data.title
    state.tableData.tableBody = data.body
    state.tableData.tableTotal = data.total
  }
}
const actions = {
  fetchWorldList ({commit, state}) {
    api.getWorldList({params: state.params})
      .then((response) => {
        let [body, title, total] = [[], [], 0]
        if (response) {
          for (let j in response) {
            for (let k in response[j]) {
              if (k === 'total') {
                total = response[j][k]
              } else {
                title.push(k)
              }
            }
            break
          }
          for (let i in response) {
            body.push(response[i])
          }
          commit('SET_TABLE_DATA', {title: title, body: body, total: total})
        }
      })
  }
}
export default {
  state,
  mutations,
  actions
}

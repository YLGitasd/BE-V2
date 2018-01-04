import api from '../api'
export const SET_CHIN_SELECT = 'SET_CHIN_SELECT'
export const SET_TABLE_DATA = 'SET_TABLE_DATA'
const state = {
  params: {
    name: 'detail',
    dateTime: new Date(Date.now() - 8.64e7),
    productStyle: '牛仔裤',
    extraShown: '热销排名',
    classification: '款式',
    attributes: '铅笔裤',
    timeLen: 7,
    pageSize: 20,
    pageCurrent: 1
  },
  tableData: {
    tableTitle: [],
    tableBody: [],
    tableTotal: 0
  }
}
const mutations = {
  [SET_CHIN_SELECT] (state, params) {
    for (let k in params) {
      state.params[k] = params[k]
    }
  },
  [SET_TABLE_DATA] (state, data) {
    state.tableData.tableTitle = data.title
    state.tableData.tableBody = data.body
    state.tableData.tableTotal = data.total
  }
}
const actions = {
  fetchPropertyList ({commit, state}) {
    api.getPropertyList({params: state.params})
      .then((response) => {
        api.formatReaponse(commit, 'SET_TABLE_DATA', response)
      })
  }
}
export default {
  state,
  mutations,
  actions
}

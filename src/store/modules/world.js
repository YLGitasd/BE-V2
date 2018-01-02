import api from '../api'
export const TAB_MENU_SELECT = 'TAB_MENU_SELECT'
export const SET_CHIN_SELECT = 'SET_CHIN_SELECT'
export const SET_TABLE_DATA = 'SET_TABLE_DATA'
export const SET_CHIN_OPTIONS = 'SET_CHIN_OPTIONS'
const getters = {
  chinOptionWorld: (state) => {
    var prodAnd = [{label: '牛仔裤', value: '牛仔裤'}, {label: '休闲裤', value: '休闲裤'}, {label: '打底裤', value: '打底裤'}]
    var timelen = [{label: '第7天', value: 7}, {label: '第14天', value: 14}]
    var attribute = state.chinOptions[1]
    var extraShown = []
    var option = state.chinOptions[0]
    for (var k in option) {
      if (option[k][0] === state.params.attribute) {
        extraShown = option[k][1]
      }
    }
    return [prodAnd, attribute, extraShown, timelen]
  }
}
const state = {
  params: {
    name: 'concern',
    productStyle: '牛仔裤',
    extraShown: '热销排名',
    attribute: '热搜搜索词',
    dateTime: api.formaterDate(Date.now() - 8.64e7, 'YYYY-MM-DD'),
    timeLen: 7,
    pageSize: 20,
    pageCurrent: 1
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
  },
  [SET_CHIN_OPTIONS] (state, data) {
    state.chinOptions = (data)
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
  },
  fetchOptionList ({commit, state}) {
    api.getOptionList({params: state.params})
    .then((response) => {
      commit('SET_CHIN_OPTIONS', response)
    })
  }
}
export default {
  getters,
  state,
  mutations,
  actions
}

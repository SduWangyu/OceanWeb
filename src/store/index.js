import { createStore } from 'vuex'

export default createStore({
  strict: true,
  state: {
    isShow:false,
    isSidebarMinimized: false,
    userName:'test',
    account:'test',
    token:'test',
    uid:'test',
    tel:'test',
    infoDevBasis:[],
    infoDevsDetail:[],
  },
  mutations: {
    loginSet(state, userdata_) {
      state.token = userdata_.token;
      state.uid = userdata_.uid;
      state.account = userdata_.account;
      state.tel = userdata_.tel
    },
  },
  actions: {
  },
  modules: {
  }
})

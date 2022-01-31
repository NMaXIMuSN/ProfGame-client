import api from "@/api/api.js";

export default {
  state: {
    page: 1,
    maxPage: 1,
    users: [],
    loadingTable: false,
  },
  mutations: {
    setPage(state, curentPage) {
      state.page = curentPage;
    },
    setMaxPage(state, maxPage) {
      state.maxPage = maxPage;
    },
    setUsersCharacteristic(state, users) {
      state.users = users;
    },
    setLoadingTable(state, payload){
      state.loadingTable = payload
    }
  },
  actions: {
    async getUsersCharacteristic({ commit }, page) {
      commit("setLoadingTable", true)
      try {
        const { data } = await api.get(
          `http://localhost:5000/api/users/characteristic/${page}`
        );
        commit("setMaxPage", data.maxPage);
        commit("setUsersCharacteristic", data.usersInfo);
      } catch (error) {
        console.log(error);
      } finally {
        commit("setLoadingTable", false)
      }
    },
    async addStats({ dispatch}, stat) {
      try {
        const { id, stats } = stat;
        const { data } = await api.post(
          `http://localhost:5000/api/users/add/characteristic/${id}`,
          stats
        );
        await dispatch(
          "getUsersCharacteristic",
          this.state.characteristicUsers.page
        );
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {},
};

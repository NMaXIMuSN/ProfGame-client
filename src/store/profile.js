import api from "@/api/api.js";

export default {
  state: {
      userInfo:{}
  },
  mutations: {
      setUserInfoProfile(state, userInfo){
          state.userInfo = userInfo
      }
  },
  actions: {
    async getUserInfo({ commit }, id) {
      try {
        const userInfo = await api.get(`http://localhost:5000/api/user/${id}`).then(res => res.data);
        commit("setUserInfoProfile", userInfo)
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {},
};

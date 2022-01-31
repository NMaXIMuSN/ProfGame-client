import api from "@/api/api.js";
export default {
  state: {
    users: [],
    loading1: false,
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    setLoading1(state, payload) {
      state.loading1 = payload;
    },
  },
  actions: {
    async getNoActivationUsers({ commit }) {
      commit("setLoading1", true);
      try {
        const res = await api.get("http://localhost:5000/api/noactivationuser");
        commit("setUsers", res.data);
      } catch (error) {
        console.log(error);
      } finally {
        commit("setLoading1", false);
      }
    },
    async activationUser({ commit }, id) {
      try {
        const response = await api
          .get(`http://localhost:5000/api/activate/${id}`)
          .then((res) => res.data);
        await getNoActivationUsers();
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {},
};

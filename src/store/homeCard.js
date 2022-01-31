import api from "@/api/api.js";
export default {
  state: {
    cards: []
  },
  mutations: {
    setCards(state, value) {
      state.cards = value.data;
    }
  },
  actions: {
    async getCards({ commit }) {
      try {
        commit("setCards", await api.get("http://localhost:5000/api/users").then(res => res));
      } catch (error) {
        console.log(error);
      }
    }
  },
  getters: {}
};

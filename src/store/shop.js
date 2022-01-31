import api from "@/api/api.js";

export default {
  state: {
    shop: [],
    newCardDate: {
      name: "",
      stats: ["0", "0", "0", "0"],
      price: "0",
      fileFoto: null,
      fileFotoName: "",
    },
    currentSort: 0,
    sortingOptions: [
      "По умолчанию",
      "по силе",
      "по красноречию",
      "по мудрости",
      "по лидерству",
      "самые дешевые",
      "самые дорогие",
    ],
  },
  mutations: {
    setShop(state, value) {
      state.shop = value;
    },
    setSort(state, sort) {
      state.currentSort = sort;
    },
    resetNewCard(state) {
      state.newCardDate = {
        name: "",
        stats: ["0", "0", "0", "0"],
        price: "0",
        fileFoto: null,
        fileFotoName: "",
      };
    },
  },
  actions: {
    async getShop({ commit }) {
      try {
        commit(
          "setShop",
          await api
            .get("http://localhost:5000/api/shop")
            .then((res) => res.data)
        );
      } catch (error) {
        console.log(error);
      }
    },
    async createShopCard({commit}) {
      let formData = new FormData();
      const body = this.state.shop.newCardDate
      formData.append("file", body.fileFoto);
      formData.append("name", body.name);
      formData.append("stats", body.stats);
      formData.append("price", body.price);
      await api.post("/shop", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      commit("resetNewCard")
    },
    async deleteCard({commit}, id){
      try {
        const delet = await api.delete("http://localhost:5000/api/shop/" + id).then(res => res.data)
        console.log(delet);
      } catch (error) {
        console.log(error);
      }
    }
  },
  getters: {},
};

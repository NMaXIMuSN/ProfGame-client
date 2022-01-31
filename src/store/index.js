import { createStore } from "vuex";


import shop from "./shop";
import profile from "./profile";
import homeCard from "./homeCard";
import activationUsers from "./activationUsers";
import characteristicUsers from "./characteristicUsers"


import api from "@/api/api.js";
export default createStore({
  state: {
    user: {},
    userInfo: {},
    isAuth: false,
    error: "",
    loading: false,
  },
  mutations: {
    setAuth(state, bool) {
      state.isAuth = bool;
    },
    setLoading(state, bool) {
      state.loading = bool;
    },
    setUser(state, user) {
      state.user = user;
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
  },
  actions: {
    async loginAPI({ commit }, user) {
      try {
        const respons = await api
          .post(
            "/login",
            { email: user.email, password: user.password },
            {
              withCredentials: true,
            }
          )
          .then((res) => res.data);
        localStorage.setItem("token", respons.accessToken);
        console.log(respons);
        commit("setAuth", true);
        commit("setUserInfo", respons.userInfo);
        commit("setUser", respons.user);
      } catch (e) {
        console.log(e.response?.data?.message);
      }
    },
    async registration({ commit }, user) {
      const { email, password } = user;
      const userInfo = {
        last: user.last,
        first: user.first,
        midl: user.midl,
        faculty: user.faculty,
        group: user.group,
        cours: user.cours,
      };
      try {
        const respons = await api
          .post("/registration", { email, password, userInfo })
          .then((res) => res.data);
        localStorage.setItem("token", respons.accessToken);
        commit("setAuth", true);
        commit("setUser", respons.user);
        return respons.user
      } catch (e) {
        console.log(e.response?.data?.message);
      }
    },
    async logout({ commit }) {
      try {
        const respons = await api.post("/logout");
        localStorage.removeItem("token");
        commit("setAuth", false);
        commit("setUser", {});
        commit("setUserInfo", {});
      } catch (e) {
        console.log(e.response?.data?.message);
      }
    },
    async checAuth({ commit }) {
      commit("setLoading", true);
      try {
        const respons = await api.get("/refresh", { withCredentials: true });
        localStorage.setItem("token", respons.data.accessToken);
        commit("setAuth", true);
        commit("setUser", respons.data.user);
        commit("setUserInfo", respons.data.userInfo);
      } catch (e) {
        console.log(e.response?.data?.message);
      } finally {
        commit("setLoading", false);
      }
    },
  },
  modules: {
    shop,
    homeCard,
    activationUsers,
    profile,
    characteristicUsers
  },
});

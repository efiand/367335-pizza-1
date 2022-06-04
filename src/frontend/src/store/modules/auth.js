import user from "@/static/user.json";
import { LOGIN, LOGOUT } from "@/store/mutation-types";

export default {
  namespaced: true,
  state: {
    currentUser: {},
  },
  mutations: {
    [LOGIN](state) {
      state.currentUser = user;
    },
    [LOGOUT](state) {
      state.currentUser = {};
    },
  },
  actions: {},
};

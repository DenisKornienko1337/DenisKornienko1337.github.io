import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const stateInit = {
  query: '',
  results: [],
  total: 0,
  page: 1,
  perPage: 10,
};

export default new Vuex.Store({
  state: { ...stateInit },
  mutations: {
    SET_RESULTS(state, data) {
      if (!data) {
        state.results = [];
        state.total = 0;
        return;
      }
      state.results = data.results;
      state.total = Math.ceil(data.total / 10);
    },
    SET_PAGE(state, page) {
      state.page = page;
    },
    SET_QUERY(state, query) {
      state.query = query;
    },
    CLEAR(state) {
      Vue.set(state, stateInit);
    },
  },
  actions: {
    async search({ commit, state }) {
      try {
        const from = (state.page - 1) * this.state.perPage;
        const response = await this.$axios.get(`/search?q=${state.query}&size=${this.state.perPage}&from=${from}`);
        commit('SET_RESULTS', response.data);
      } catch (err) {
        console.log(err);
      }
    },
  },
});

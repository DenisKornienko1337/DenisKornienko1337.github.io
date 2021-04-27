import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const stateInit = {
  query: '',
  results: [],
  total: 0,
  page: 1,
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
      state.query = stateInit.query;
      state.results = stateInit.results;
      state.total = stateInit.total;
      state.page = stateInit.page;
    },
  },
  actions: {
    async search({ commit, state }, params) {
      if (params.query) commit('SET_QUERY', params.query);
      if (params.page) commit('SET_PAGE', params.page);
      try {
        /* eslint no-underscore-dangle: 0 */
        const from = (state.page - 1) * this._vm.$perPage;
        const response = await this._vm.$axios.get(`/search?q=${state.query}&size=${this._vm.$perPage}&from=${from}`);
        commit('SET_RESULTS', response.data);
      } catch (err) {
        console.log(err);
      }
    },
  },
  modules: {
  },
});

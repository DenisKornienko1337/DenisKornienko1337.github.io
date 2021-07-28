<template>
  <div class="search">
    <input
      type="text"
      class="form-control"
      placeholder="Type here..."
      v-model.trim="query"
      @input="search"
    >
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Search',
  data() {
    return {
      query: '',
    };
  },
  computed: mapState([
    'page',
  ]),

  async mounted() {
    const { query, page } = this.$route.query;
    if (query && page) {
      this.query = query;
      this.$store.commit('SET_QUERY', query);
      this.$store.commit('SET_PAGE', Number(page));
      this.$store.dispatch('search');
    }
  },

  methods: {
    async search() {
      this.$store.commit('SET_QUERY', this.query);
      this.$store.commit('SET_PAGE', 1);
      if (this.query.length < 1) {
        this.$store.commit('CLEAR');
        this.$router.push('/');
        return;
      }
      this.$store.dispatch('search');
      this.$router.push(`/?query=${this.query}&page=1`);
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  max-width: 500px;
  margin: 20px auto;
}
</style>

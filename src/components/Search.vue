<template>
  <div class="search">
    <input
      type="text"
      class="form-control"
      placeholder="Type here..."
      v-model="query"
      @input="search"
    >
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      query: '',
    };
  },
  computed: {
    page() {
      return this.$store.page;
    },
  },
  methods: {
    async search() {
      if (!this.query.trim()) {
        this.$store.commit('CLEAR');
        this.$router.push('/');
        return;
      }
      await this.$store.dispatch('search', {
        query: this.query.trim(),
        page: 1,
      });
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

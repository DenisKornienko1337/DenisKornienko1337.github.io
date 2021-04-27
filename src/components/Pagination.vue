<template>
  <div v-if="results.length" class="pagination d-flex">
    <div class="pagination-goto">
      <div>
        Page: {{curPage}}/{{total}}
      </div>
      <div>
        Go to
        <input
          type="number"
          v-model="page"
          @keyup.enter="paginate"
        >
        <button
          type="button"
          class="btn btn-primary"
          @click="paginate"
        >
          Go
        </button>
      </div>
    </div>
    <div class="pagination-classic">
      <div class="pagination-classic-prev">
        <button
          type="button"
          :class="curPage==1 ? 'btn btn-secondary': 'btn btn-primary'"
          :disabled="curPage==1"
          @click="leaf(-1)"
        >
          Prev
        </button>
      </div>
      <div class="pagination-classic-next">
        <button
          type="button"
          :class="curPage==total ? 'btn btn-secondary': 'btn btn-primary'"
          :disabled="curPage==total"
          @click="leaf(1)"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  data() {
    return {
      page: 1,
    };
  },
  computed: {
    results() {
      return this.$store.state.results;
    },
    total() {
      return this.$store.state.total;
    },
    curPage() {
      return this.$store.state.page;
    },
    query() {
      return this.$store.state.query;
    },
  },
  methods: {
    async paginate() {
      if (this.page < 1) this.page = 1;
      if (this.page > this.total) this.page = this.total;
      await this.$store.dispatch('search', {
        page: this.page,
      });
      this.$router.push(`/?query=${this.query}&page=${this.page}`);
    },
    async leaf(num) {
      this.page = Number(this.page) + Number(num);
      await this.$store.dispatch('search', {
        page: this.page,
      });
      this.$router.push(`/?query=${this.query}&page=${this.page}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-between;
  flex-wrap: wrap;
  &-classic {
    margin-top: 25px;
    &-prev, &-next {
      display: inline-block;
      margin-left: 20px;
      margin-right: 20px;
    }
    flex-basis: 100%;
  }
  &-goto {
    flex-basis: 100%;
    input {
      margin: 5px;
      max-width: 70px;
    }
  }
}
</style>

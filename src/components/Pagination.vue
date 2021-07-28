<template>
  <div v-if="results.length" class="pagination d-flex">
    <div class="pagination-goto">
      <div>
        Page: {{page}}/{{total}}
      </div>
      <div>
        Go to
        <input
          type="number"
          v-model.trim="curPage"
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
          :class="page == 1 ? 'btn btn-secondary': 'btn btn-primary'"
          :disabled="page == 1"
          @click="prev"
        >
          Prev
        </button>
      </div>
      <div class="pagination-classic-next">
        <button
          type="button"
          :class="page == total ? 'btn btn-secondary': 'btn btn-primary'"
          :disabled="page == total"
          @click="next"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Pagination',

  data() {
    return {
      curPage: 1,
    };
  },

  computed: mapState([
    'results',
    'total',
    'page',
    'query',
  ]),

  mounted() {
    this.curPage = this.page;
  },

  methods: {
    async paginate() {
      if (this.curPage < 1) this.curPage = 1;
      if (this.curPage > this.total) this.curPage = this.total;
      this.$store.commit('SET_PAGE', this.curPage);
      this.$store.dispatch('search');
      this.$router.push(`/?query=${this.query}&page=${this.curPage}`);
    },

    prev() {
      this.curPage -= 1;
      this.paginate();
    },

    next() {
      this.curPage += 1;
      this.paginate();
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

<template>
  <div :class="isPopup ? 'layout o-hidden': 'layout'">
    <detailed-popup v-if="isPopup" :curPackage="curPackage" />
    <top-title />
    <search />
    <main-table v-if="query" />
    <pagination v-if="query" />
    <custom-footer />
  </div>
</template>

<script>
import TopTitle from '@/components/Title';
import Search from '@/components/Search';
import MainTable from '@/components/Table';
import Pagination from '@/components/Pagination';
import DetailedPopup from '@/components/DetailedPopup';
import CustomFooter from '@/components/Footer';

import eventBus from '@/main';

import { mapState } from 'vuex';

export default {
  name: 'BaseLayout',
  data() {
    return {
      isPopup: false,
      curPackage: {},
    };
  },
  components: {
    TopTitle,
    Search,
    MainTable,
    Pagination,
    DetailedPopup,
    CustomFooter,
  },

  computed: mapState([
    'query',
  ]),

  methods: {
    setPopup(item) {
      this.curPackage = item;
      this.isPopup = true;
    },
    closePopup() {
      this.isPopup = false;
    },
  },

  mounted() {
    eventBus.$on('setPopup', this.setPopup);
    eventBus.$on('closePopup', this.closePopup);
  },
};
</script>

<style lang="scss" scoped>
.layout {
  &.o-hidden {
    overflow: hidden;
  }
  padding: 15px;
  min-height: 100vh;
  position: relative;
  margin-bottom: 20px;
}
</style>

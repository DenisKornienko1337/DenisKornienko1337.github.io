<template>
  <div class="layout">
    <detailed-popup v-if="isPopup" :curPackage="curPackage" />
    <top-title />
    <search />
    <main-table />
    <pagination />
  </div>
</template>

<script>
// eslint-disable
import TopTitle from '@/components/Title';
import Search from '@/components/Search';
import MainTable from '@/components/Table';
import Pagination from '@/components/Pagination';
import DetailedPopup from '@/components/DetailedPopup';

import eventBus from '@/main';

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
  },
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
  height: 100%;
  padding: 15px;
  position: relative;
}
</style>

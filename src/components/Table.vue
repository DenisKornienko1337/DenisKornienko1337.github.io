<template>
  <table v-if="results.length" class="table table-bordered">
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Version</th>
        <th scope="col">Description</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in results"
        :key="item.name"
        @click="openPopup(index)"
      >
        <th scope="row">{{item.package.name}}</th>
        <td>{{item.package.version}}</td>
        <td>{{item.package.description}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import eventBus from '@/main';

export default {
  name: 'Table',
  computed: {
    results() {
      return this.$store.state.results;
    },
  },
  methods: {
    openPopup(index) {
      eventBus.$emit('setPopup', this.results[index].package);
    },
  },
};
</script>

<style lang="scss" scoped>
.table {
  max-width: 1024px;
  margin: 20px auto;
  tr {
    cursor: pointer;
    &:hover {
    background-color: lightgray;
    }
  }
}
</style>

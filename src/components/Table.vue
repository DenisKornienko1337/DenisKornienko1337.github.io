<template>
  <div class="table-wrapper" >
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
  </div>
</template>

<script>
import eventBus from '@/main';
import { mapState } from 'vuex';

export default {
  name: 'Table',
  computed: mapState([
    'results',
  ]),

  methods: {
    openPopup(index) {
      eventBus.$emit('setPopup', this.results[index].package);
    },
  },
};
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
  max-width: 100%;
  height: auto;
  margin: 20px auto;
  table-layout: fixed;
  &-wrapper {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
  tr {
    cursor: pointer;
    overflow: hidden;
    &:hover {
      background-color: lightgray;
    }
  }
  td {
    padding: 10px;
    word-break: break-word;
  }
}
</style>

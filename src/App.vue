<template>
  <div id="app">
    <layout />
  </div>
</template>

<script>
import layout from '@/layouts';

export default {
  name: 'App',
  components: {
    layout,
  },
  mounted() {
    if (this.$route.path !== '/') {
      this.$router.push('/');
    }
  },
};
</script>

<style lang="scss">
html, body, #app {
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

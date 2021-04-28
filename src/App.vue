<template>
  <div id="app">
    <layout />
    <custom-footer />
  </div>
</template>

<script>
import layout from '@/layouts';
import CustomFooter from '@/components/Footer';

export default {
  name: 'App',
  components: {
    layout,
    CustomFooter,
  },
  mounted() {
    if (JSON.stringify(this.$route.query) !== '{}') {
      this.$router.push('/');
    }
  },
};
</script>

<style lang="scss">
html, body, #app {
  min-height: 100vh;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
}
</style>

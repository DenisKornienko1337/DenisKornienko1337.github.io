<template>
  <div class="footer">
    <p>
      <span>Developed by </span>
      <a href="https://github.com/DenisKornienko1337/">Denis Kornienko</a>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style lang="scss" scoped>
.footer {
  padding: 15px;
  background-color: #000;
  width: 100vw;
  z-index: 1;
  color: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
}
</style>

<template>
  <div class="detailed" @click.self="closePopup">
    <div class="detailed-popup">
      <div class="detailed-popup--header">
        <div class="detailed-popup--header__title">
          {{curPackage.name}}
          <div
          class="bg-danger"
          @click="closePopup"
          >
            &times;
          </div>
        </div>
      </div>
      <div class="detailed-popup--body">
        <div class="detailed-popup--body__version">
          <span>Version:</span>
          {{curPackage.version}}
        </div>
        <div class="detailed-popup--body__description">
          {{curPackage.description}}
        </div>
        <div class="detailed-popup--body__keywords">
          <span>Keywords:</span>
          {{keywords}}
        </div>
        <div class="detailed-popup--body__last">
          <span>Last publish:</span>
          {{curPackage.date | parseDate}}
        </div>
        <div class="detailed-popup--body__links">
          <h3 class="text-center">Links</h3>
          <div class="row">
            <div
              class="col-md-3 text-center"
              v-for="(prop, index) in Object.keys(curPackage.links)"
              :key="index"
            >
              <a :href="curPackage.links[prop]">{{prop}}</a>
            </div>
          </div>
        </div>
        <div class="detailed-popup--body__author" v-if="curPackage.author">
          <h3 class="text-center">Author</h3>
          <div v-if="curPackage.author.name">{{curPackage.author.name}}</div>
          <a
            v-if="curPackage.author.email"
            :href="curPackage.author.email"
          >
            {{curPackage.author.email}}
          </a>
        </div>
        <div class="detailed-popup--body__publisher" v-if="curPackage.publisher">
          <h3 class="text-center">Publisher</h3>
          <div v-if="curPackage.publisher.name">{{curPackage.publisher.name}}</div>
          <a
            v-if="curPackage.publisher.email"
            :href="curPackage.publisher.email"
          >
            {{curPackage.publisher.email}}
          </a>
        </div>
        <div class="detailed-popup--body__maintainers">
          <h3 class="text-center">Maintainers</h3>
          <div
            v-for="(maintainer, index) in curPackage.maintainers"
            :key="index"
          >
            <div v-if="maintainer.username">{{maintainer.username}}</div>
            <a
              v-if="maintainer.email"
              :href="maintainer.email"
            >
            {{maintainer.email}}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from '@/main';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export default {
  name: 'DetailedPopup',
  filters: {
    parseDate(date) {
      const parsedDate = new Date(date);
      const year = parsedDate.getFullYear();
      const monthNumber = parsedDate.getMonth();
      const dayNumber = parsedDate.getDate();
      return `${months[monthNumber]} ${dayNumber}, ${year}`;
    },
  },
  computed: {
    keywords() {
      if (this.curPackage.keywords) {
        return this.curPackage.keywords.join(', ');
      }
      return [];
    },
  },
  props: ['curPackage'],
  methods: {
    closePopup() {
      eventBus.$emit('closePopup');
    },
  },
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>

<style lang="scss" scoped>
.detailed {
  z-index: 1;
  overflow-x: hidden;
  &-popup{
    h3 {
      margin-top: 20px;
      margin-bottom: 0;
    }
    background-color: #fff;
    top: 50px;
    position: absolute;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    max-width: 700px;
    width: calc(100% - 30px);
    &--body {
      max-height: 80vh;
      overflow-y: scroll;
      font-size: 20px;
      padding: 15px;
      text-align: left;
      &__author, &__publisher, &__maintainers {
        text-align: center;
      }
    }
    &--header {
      &__title {
        font-size: 24px;
        position: relative;
        div {
          position: absolute;
          right: 0;
          top: 0;
          width: 50px;
          cursor: pointer;
          color: #fff;
        }
      }
      border-bottom: 2px solid #000;
    }
  }
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .6);
}
</style>

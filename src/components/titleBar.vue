<template>
  <div class="title-bar">
    <span>COST DATABASE</span>
    <span class="powered">BY PURE PEACE</span>
    <span class="filter-button" v-if="pages && pages.index > 1" @click="beforePage">上一页</span>
    <span
      class="filter-button"
      v-if="pages && pages.index < pages.total"
      @click="nextPage"
    >下一页</span>
    <span
      class="filter-button"
      v-if="pages && pages.index"
      @click="showJump"
    >{{pages.index}} / {{ pages.total}}</span>
    <span class="filter-button" @click="switchFilter">过滤器</span>
  </div>
</template>

<script>
export default {
  props: {
    pages: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    showJump () {
      this.$emit('showJumpDialog')
    },
    switchFilter () {
      this.$emit('switchFilter')
    },
    nextPage () {
      this.$emit('nextPage')
    },
    beforePage () {
      this.$emit('beforePage')
    }
  }
}
</script>

<style scoped>
.filter-button {
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 4px;
  transition: 0.2s ease;
  cursor: pointer;
  margin-left: auto;
  background-color: #131625;
  user-select: none;
}

.filter-button:hover {
  filter: brightness(0.8);
}

.filter-button:active {
  filter: brightness(0.7);
}

.powered {
  display: flex;
  padding: 0 20px;
  font-size: 14px;
  flex: 1;
  justify-content: flex-start;
}

.title-bar {
  background-color: #131625;
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 40px;
  font-size: 22px;
  font-weight: lighter;
}

</style>

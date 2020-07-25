<template>
  <el-tooltip effect="dark" :content="country + (count !== -1 ? `: ${count}` : '')" placement="top-start">
    <div class="flag-box">
      <img class="flag" :src="`https://osu.ppy.sh/images/flags/${country}.png`" />
    </div>
  </el-tooltip>
</template>

<script>
export default {
  props: {
    country: {
      type: String,
      default: ''
    },
    count: {
      type: Number,
      default: -1
    }
  }
}
</script>

<style scoped>
.flag {
  height: 26px;
}
.flag-box {
  display: flex;
  align-items: center;
}
</style>

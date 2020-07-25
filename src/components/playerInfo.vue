<template>
  <div class="player-info">
    <div>
      <span>New Cost:</span>
      <span style="color: #e57373;">{{player.cost.toFixed(3)}}</span>
    </div>
    <div>
      <span>Old Cost:</span>
      <span style="color: #7986CB;">{{player.old_cost.toFixed(3)}}</span>
    </div>
    <div>
      <span>Diff:</span>
      <span :style="diffColorStyle">{{costChange}}</span>
    </div>

    <div>
      <span>Playcount:</span>
      <span style="color: #FAFAFA;">{{numFormatter(player.playcount)}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    player: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    numFormatter () {
      return num => {
        return parseFloat(num)
          .toFixed(0)
          .toString()
          .replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
      }
    },
    diffColorStyle () {
      return (
        'color: ' +
        (this.player.cost - this.player.old_cost > 0 ? '#f44336' : '#66BB6A')
      )
    },
    costChange () {
      return parseFloat(this.player.cost - this.player.old_cost).toFixed(2)
    }
  }
}
</script>

<style scoped>
.player-info {
  display: flex;
  align-items: center;
  font-weight: lighter;
  font-size: 16px;
  padding: 10px 0;
}

.player-info div {
  margin-right: 10px;
}

.player-info span {
  margin-right: 5px;
}
</style>

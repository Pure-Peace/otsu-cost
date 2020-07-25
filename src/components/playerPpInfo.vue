<template>
  <div :class="playerPPInfoBoxClass">
    <div v-if="display==='column'" class="player-pp-info-title">STATUS</div>
    <div
      v-for="(value, key) in ['AimJump','AimFlow','Speed','Stamina', 'Accuracy', 'Precision','Average','Sum']"
      :key="key"
      :style="ppInfoStyle(value)"
      :class="childBoxClass"
    >
      <div>{{fixer(value)}}:</div>
      <div>{{numFormatter(player.pp[value])}}</div>
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
    },
    display: {
      type: String,
      default: 'row'
    }
  },
  computed: {
    playerPPInfoBoxClass () {
      return 'player-pp-info' + (this.display === 'column' ? ' column-style' : '')
    },
    ppInfoStyle () {
      return value => {
        return (
          'color: ' + (this.player.pp[value] === this.maxValue ? '#ffcdd2' : '')
        )
      }
    },
    maxValue () {
      const { Sum, Total, AimTotal, ...data } = this.player.pp
      return Math.max(...Object.values(data))
    },
    fixer () {
      return value => {
        const dict = {
          AimJump: 'Jump',
          AimFlow: 'Flow'
        }
        return dict[value] || value
      }
    },
    numFormatter () {
      return num => {
        return parseFloat(num)
          .toFixed(0)
          .toString()
          .replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
      }
    },
    childBoxClass () {
      return (this.display === 'column' ? 'column-child-box' : 'row-child-box')
    }
  }
}
</script>

<style scoped>
.player-pp-info {
  display: flex;
  font-size: 14px;
  padding: 10px 0;
  font-weight: lighter;
}

.column-style {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 18px;
}

.row-child-box {
  display: flex;
  transition: .4s ease;
}

.column-child-box {
  min-width: 160px;
  display: flex;
  justify-content: space-between;
  transition: .4s ease;
}

.column-style > div {
  margin-bottom: 5px;
}

.player-pp-info > div {
  margin-right: 5px;
}

.player-pp-info > div > div {
  margin-right: 5px;
}

.player-pp-info-title {
  font-size: 20px;
  font-weight: bold;
  padding: 10px 0;
}
</style>

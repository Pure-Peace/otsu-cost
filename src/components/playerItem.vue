<template>
  <div :class="itemClass">
    <player-name-box :player="player" />
    <div class="player-info-box">
      <player-info :player="player" />
      <player-pp-info :player="player" />
    </div>
  </div>
</template>

<script>
import playerNameBox from '@/components/playerNameBox.vue'
import playerInfo from '@/components/playerInfo.vue'
import playerPpInfo from '@/components/playerPpInfo.vue'

export default {
  components: {
    playerNameBox,
    playerInfo,
    playerPpInfo
  },
  props: {
    player: {
      type: Object,
      default: () => {
        return {}
      }
    },
    idx: {
      type: Number,
      default: -1
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    itemClass () {
      return 'player-item-box' + (this.selected ? ' selected-item-box' : '')
    }
  }
}
</script>

<style scoped>
.player-item-box {
  display: flex;
  flex-direction: column;
  background-color: #252526;
  padding: 20px 30px;
  transition: 0.2s ease;
  border-bottom: 1px solid #333335ad;
  border-left: 4px solid #25252600;
  border-right: 1px solid #252526;
  border-top: 1px solid #252526;
  cursor: pointer;
}

.player-item-box:hover {
  background-color: #37373d;
}

.selected-item-box {
  border: 1px solid #7986cb;
  border-left: 4px solid #7986cb;
  background-color: #201f1f !important;
}
</style>

<template>
  <div class="player-name-box">
    <div class="player-name-content">
      <div class="avatar-box">
        <a :href="`https://osu.ppy.sh/users/${player.userid}`" target="_blank">
          <img class="avatar" :src="`http://s.ppy.sh/a/${player.userid}`" />
        </a>
      </div>
      <div class="username">
        <a :href="`https://osu.ppy.sh/users/${player.userid}`" target="_blank">{{player.username}}</a>
      </div>
    </div>
    <div class="player-pp-rank">
      <div style="font-size: 18px; font-weight: bold;">
        <span>{{numFormatter(player.pp.Total)}} PP+</span>
      </div>
      <div style="font-size: 16px;">
        <span>#{{numFormatter(player.rank)}}{{player.rank===10000?'+':''}}</span>
      </div>

      <div style="display: flex; align-items: center; font-size: 16px;">
        <span>#</span>
        <span>{{numFormatter(player.country_rank)}}</span>
        <span style="padding: 0 5px;">({{player.country}})</span>
      </div>
      <flag :country="player.country" />
    </div>
  </div>
</template>

<script>
import flag from '@/components/flag.vue'

export default {
  components: {
    flag
  },
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
    }
  }
}
</script>

<style scoped>
.player-name-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  padding: 15px 0;
  min-height: 80px;
}

.player-name-box > div {
  margin-right: 10px;
}

.avatar {
  width: 42px;
  border-radius: 4px;
}

a {
  color: #fafafa;
  text-decoration: none;
  transition: 0.4s ease;
  display: flex;
  align-items: center;
}

a:hover {
  color: #ef9a9a;
}

.player-name-content {
  margin-left: 10px;
  display: flex;
  align-items: center;
}

.player-name-content > div {
  margin-right: 10px;
}

.avatar-box {
  display: flex;
  align-items: center;
  background-color: #131625;
  border-radius: 4px;
}

.username {
  padding: 0 5px;
  font-weight: bold;
}

.player-pp-rank {
  display: flex;
  align-items: center;
  font-weight: lighter;
}

.player-pp-rank > div {
  margin-right: 15px;
}
</style>

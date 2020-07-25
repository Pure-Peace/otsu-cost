<template>
  <div class="player-view-box">
    <div class="non-player-view" v-if="!player">
      <div style="font-size: 60px; padding: 20px 0;">
        <i class="el-icon-mouse"></i>
      </div>
      <div>请选择一名玩家</div>
    </div>
    <vue-scroll slot="scroll-content" v-if="player" :ops="opts">
      <div style="height: 100%;">
        <player-name-box :player="player" />
        <player-info :player="player" />
        <div class="player-data-content">
          <player-pp-info :display="`column`" :player="player" />
          <v-chart :options="getOption" />
        </div>
        <div class="best-performance-list-box" v-loading="gettingBp">
          <div v-if="!player.table" class="get-bp-content">
            <div class="row-button" @click="handleGetBp">查看所有 bp（数量可能达到800个，所以需要等待）</div>
          </div>
          <div v-if="player.table">
            <div style="font-size: 28px; font-weight: lighter; padding: 20px;">Best Performance</div>
            <div class="skills-button-box">
              <div
                v-for="(skill, idx) in Object.keys(player.table)"
                :key="idx"
                @click="showSkill = skill"
                :class="skillsClass(skill)"
              >
              <span>{{ skill.toUpperCase().replace('_', ' ') }}</span>
              <span> ( {{ player.table[skill].length }} ) </span>
              </div>
            </div>
            <div class="bp-box">
              <bp-item  v-for="(bp, bpidx) in player.table[showSkill]" :bp="bp" :key="bpidx"/>
            </div>
          </div>
        </div>
      </div>
    </vue-scroll>
  </div>
</template>

<script>
import playerNameBox from '@/components/playerNameBox'
import playerInfo from '@/components/playerInfo'
import playerPpInfo from '@/components/playerPpInfo'
import bpItem from '@/components/bpItem'

import 'echarts/lib/chart/radar'

export default {
  components: {
    playerNameBox,
    playerInfo,
    playerPpInfo,
    bpItem
  },
  data () {
    return {
      showSkill: 'total',
      opts: {
        rail: {
          background: '#FAFAFA',
          opacity: 0,
          size: '6px',
          specifyBorderRadius: false,
          gutterOfEnds: null,
          gutterOfSide: '0px',
          keepShow: false
        },
        bar: {
          showDelay: 500,
          background: '#FAFAFA',
          opacity: 0.8,
          specifyBorderRadius: false,
          size: '6px'
        }
      }
    }
  },
  props: {
    player: {
      type: Object,
      default: () => {
        return undefined
      }
    },
    gettingBp: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    skillsClass () {
      return skill => {
        return (
          'skill-select-button' +
          (this.showSkill === skill ? ' skill-select-button-selected' : '')
        )
      }
    },
    getOption () {
      return {
        backgroundColor: 'transparent',
        radar: {
          indicator: [
            { name: 'JUMP', max: this.maxValue },
            { name: 'FLOW', max: this.maxValue },
            { name: 'SPEED', max: this.maxValue },
            { name: 'STAMINA', max: this.maxValue },
            { name: 'ACCURACY', max: this.maxValue },
            { name: 'PRECISION', max: this.maxValue }
          ],
          splitNumber: 5,
          name: {
            textStyle: {
              color: 'rgba(121,134,203 ,1)'
            }
          },
          splitLine: {
            lineStyle: {
              color: [
                'rgba(121,134,203, 0.1)',
                'rgba(121,134,203, 0.3)',
                'rgba(121,134,203, 0)',
                'rgba(121,134,203, 0.1)',
                'rgba(121,134,203, 0)',
                'rgba(121,134,203, .6)'
              ]
            }
          },
          splitArea: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(121,134,203, 0.3)'
            }
          }
        },
        series: [
          {
            type: 'radar',
            lineStyle: {
              normal: {
                width: 2,
                opacity: 0.6
              }
            },
            data: [this.chartData],
            symbol: 'none',
            itemStyle: {
              color: 'rgba(121,134,203, 1)'
            },
            areaStyle: {
              opacity: 0.1
            }
          }
        ]
      }
    },
    chartData () {
      const pp = this.player && this.player.pp
      return pp
        ? [
          pp.AimJump,
          pp.AimFlow,
          pp.Speed,
          pp.Stamina,
          pp.Accuracy,
          pp.Precision
        ]
        : [0, 0, 0, 0, 0, 0]
    },
    maxValue () {
      if (!this.player || !this.player.pp) return 0

      const { Sum, Total, AimTotal, ...data } = this.player.pp
      return Math.max(...Object.values(data))
    }
  },
  methods: {
    handleCancel () {
      this.$emit('cancel')
    },
    handleGetBp () {
      this.$emit('getBp', this.player)
    }
  }
}
</script>

<style scoped>
.skill-select-button {
  background-color: #181717;
  padding: 10px 20px;
  border-radius: 4px;
  transition: 0.2s ease;
  cursor: pointer;
  user-select: none;
  font-size: 16px;
  margin-right: 15px;
  margin-bottom: 15px;
  font-weight: lighter;
}

.skill-select-button:hover {
  filter: brightness(0.8);
}

.skill-select-button-selected {
  background-color: rgba(211, 47, 47, 1);
}

.bp-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 100%;
}

.bp-item {
  margin-bottom: 15px;
  padding: 20px;
  background-color: #252526;
}

.skills-button-box {
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-width: 100%;
}

.get-bp-content {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 20px;
  width: 100%;
  max-width: 100%;
}

.player-view-box {
  padding: 20px;
  height: 100%;
}

.non-player-view {
  padding: 40px 0;
  font-size: 28px;
  font-weight: lighter;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.player-data-content {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
}

.best-performance-list-box {
  margin-top: 20px;
  padding: 20px 0;
  width: 100%;
  max-width: 100%;
}

.row-button {
  width: 100%;
  margin-top: 20px;
  background-color: #252526;
  padding: 20px 20px;
  border-radius: 4px;
  transition: 0.2s ease;
  cursor: pointer;
  user-select: none;
  font-weight: lighter;
  font-size: 18px;
}

.row-button:hover {
  filter: brightness(1.1);
}

.row-button:active {
  filter: brightness(0.9);
}
</style>

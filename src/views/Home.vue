<template>
  <div style="height: 100% !important; max-height: 100% !important; min-height: 100% !important;">
    <title-bar
      :pages="pages"
      @showJumpDialog="handleShowJumpDialog"
      @switchFilter="showFilter = !showFilter"
      @nextPage="handleNextPage"
      @beforePage="handleBeforePage"
    />

    <el-dialog :visible.sync="showJumpDialog">
      <div class="dialog-content">
        <div class="dialog-real-title">选择降落位置 ({{tempPages.index}} / {{ tempPages.total}})：</div>
        <div>
          <el-input-number v-model="tempPages.index" :min="1" :max="pages.total" label="您到第几页？嗯？"></el-input-number>
        </div>
        <div>
          <el-button type="primary" plain @click="handleFly">芜湖起飞</el-button>
        </div>
      </div>
    </el-dialog>

    <div class="main-box">
      <div class="player-view">
        <player-view
          v-show="!showFilter"
          :player="currentPlayer"
          :gettingBp="gettingBp"
          @getBp="handleGetbp"
          @cancel="currentPlayer = undefined"
        />
        <system-filter
          v-show="showFilter"
          :selectedCountry="selectedCountry"
          :selectedSkill="selectedSkill"
          :searching="searching"
          @close="showFilter = false"
          @selectSkill="handleSelectSkill"
          @selectCountry="handleSelectCountry"
          @handleSearch="handleSearch"
          :countrys="countrys"
        />
      </div>

      <vue-scroll>
        <div class="player-list" v-loading="loading">
          <player-item
            @click.native="handlePlayerClick(player)"
            v-for="(player, idx) in playerList"
            :key="`player${player.userid}${idx}`"
            :player="player"
            :selected="currentPlayer === player"
            :idx="idx"
          />
        </div>
      </vue-scroll>
    </div>
  </div>
</template>

<script>
import playerItem from '@/components/playerItem.vue'
import playerView from '@/components/playerView.vue'
import systemFilter from '@/components/systemFilter.vue'
import titleBar from '@/components/titleBar.vue'

export default {
  components: { playerItem, playerView, systemFilter, titleBar },
  data () {
    return {
      gettingBp: false,
      searching: false,
      showJumpDialog: false,
      showFilter: false,
      currentPlayer: undefined,
      loading: true,
      playerList: [],
      pages: {},
      tempPages: {},
      countrys: {},
      selectedSkill: 'Total',
      selectedCountry: 'CN'
    }
  },
  computed: {},
  async mounted () {
    this.handleGetPlayerList()
    this.handleGetCountrys()
  },
  methods: {
    async handleGetCountrys () {
      this.$backend
        .getCountrys()
        .then(resp => {
          if (resp.status !== 1) throw new Error(resp.message)
          this.countrys = resp.data
        })
        .catch(err => {
          console.error(err)
        })
    },
    getPlayerData (item) {
      const { player, ...data } = item
      return { ...player, ...data }
    },
    async handleGetPlayerList () {
      try {
        this.loading = true
        const resp = await this.$backend.getPlayerList(this.getParams())
        if (resp.status !== 1) throw new Error(resp.message)
        const { data, pages } = resp

        this.pages = pages
        this.playerList = data.map(item => this.getPlayerData(item))
        this.loading = false
        // console.log(this.playerList)
      } catch (err) {
        console.error(err)
        this.loading = false
      }
    },
    getParams () {
      const params = {
        pp_order: this.selectedSkill,
        page: (this.pages && this.pages.index) || 1
      }
      if (this.selectedCountry && this.selectedCountry !== 'ALL') {
        params.country = this.selectedCountry
      } else {
        params.country = ''
      }
      return params
    },
    handleSelectSkill (skill) {
      this.selectedSkill = skill
      this.handleGetPlayerList()
    },
    handleSelectCountry (country) {
      this.selectedCountry = country
      this.handleGetPlayerList()
    },
    handlePlayerClick (player) {
      this.currentPlayer = player
      this.showFilter = false
    },
    handleBeforePage () {
      this.pages.index--
      this.handleGetPlayerList()
    },
    handleNextPage () {
      this.pages.index++
      this.handleGetPlayerList()
    },
    handleFly () {
      this.pages = Object.assign({}, this.tempPages)
      this.handleGetPlayerList()
      this.showJumpDialog = false
    },
    handleShowJumpDialog () {
      this.tempPages = Object.assign({}, this.pages)
      this.showJumpDialog = true
    },
    handleSearch (input) {
      if (input) {
        this.searching = true
        const playerList = this.playerList
        const targetIndex = playerList.findIndex(
          item =>
            item.userid === input ||
            item.username.toLowerCase() === input.toLowerCase()
        )
        if (targetIndex !== -1) {
          const player = playerList.splice(targetIndex, 1)[0]
          this.playerList.unshift(player)
          this.searching = false
        } else {
          this.$backend
            .getPlayer(input)
            .then(resp => {
              if (resp.status !== 1 && resp.status !== 2) { throw new Error('获取数据失败') }

              const player = resp.data
              this.playerList.unshift(this.getPlayerData(player))
              this.searching = false
            })
            .catch(err => {
              console.error(err)
              this.searching = false
            })
        }
      }
    },
    async handleGetbp () {
      try {
        this.gettingBp = true
        const resp = await this.$backend.getBp(this.currentPlayer.userid)
        if (resp.status !== 1) throw new Error('获取数据失败')

        this.currentPlayer.table = resp.data.table
        this.gettingBp = false
      } catch (err) {
        console.error(err)
        this.gettingBp = false
      }
    }
  }
}
</script>

<style scoped>
.main-box {
  display: flex;
  height: calc(100% - 70px);
}

.player-view {
  flex: 1;
  min-width: calc(100% - 850px);
  background-color: #1e1e1e;
}

.player-list {
  background-color: #1e1e1e;
  min-width: 850px;
  overflow: hidden;
}

.dialog-real-title {
  display: flex;
  flex-direction: flex-start;
  font-size: 22px;
  font-weight: lighter;
  padding: 0 20px;
}

.dialog-content > div {
  margin-bottom: 25px;
}
</style>

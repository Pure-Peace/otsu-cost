<template>
  <div class="system-filter-box">
    <div class="system-filter-title">
      <div>过滤器</div>
      <div class="filter-button" @click="handleClose">关闭</div>
    </div>
    <div v-loading="searching" class="system-filter-content">
      <div class="search-block">
        <input class="search-input" ref="searchInput" placeholder="使用名字或id搜索玩家" />
        <span class="search-button" @click="handleSearchPlayer">搜索</span>
      </div>
    </div>
    <div class="system-filter-title">
      <div>
        <span>选择国家或地区</span>
        <span style="font-size: 16px; padding: 0 8px;">( {{ selectedCountry}} )</span>
      </div>
    </div>
    <div class="system-filter-content">
      <div class="country-block">
        <div class="flag-button" @click="handleSelectCountry('ALL')">
          <div class="global-button">ALL</div>
        </div>
        <div
          v-for="(item, idx) in countryList"
          :key="idx"
          class="flag-button"
          @click="handleSelectCountry(item.country)"
        >
          <flag :country="item.country" :count="item.count" />
        </div>
      </div>
    </div>
    <div class="system-filter-title">
      <div>按照数据排名</div>
    </div>
    <div class="system-filter-content">
      <div class="skills-block">
        <div @click="handleSelectSkill(skill)" v-for="(skill, idx) in skills" :key="idx" :class="skillButton(skill)">{{ skill }}</div>
      </div>
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
    countrys: {
      type: Object,
      default: () => {
        return {}
      }
    },
    selectedCountry: {
      type: String,
      default: 'CN'
    },
    selectedSkill: {
      type: String,
      default: 'Total'
    },
    searching: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      skills: [
        'Total',
        'AimTotal',
        'AimJump',
        'AimFlow',
        'Speed',
        'Stamina',
        'Accuracy',
        'Precision',
        'Average',
        'Sum',
        'NewCost',
        'OldCost',
        'CostDiff',
        'CostDiffDown',
        'Playcount',
        'PlaycountDown'
      ]
    }
  },
  computed: {
    skillButton () {
      return skill => {
        return (
          'skill-button' +
          (this.selectedSkill === skill ? ' skill-button-selected' : '')
        )
      }
    },
    countryList () {
      const countrys = this.countrys
      const temp = []
      for (const country in countrys) {
        temp.push({ country, count: countrys[country] })
      }

      return temp.sort((a, b) => b.count - a.count)
    }
  },
  methods: {
    handleSearchPlayer () {
      this.$emit('handleSearch', this.$refs.searchInput.value.trim())
    },
    handleSelectSkill (skill) {
      this.$emit('selectSkill', skill)
    },
    handleSelectCountry (country) {
      this.$emit('selectCountry', country)
    },
    handleClose () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.search-button {
  width: 100px;
  background-color: rgba(55, 71, 79, 1);
  border-radius: 0 4px 4px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: lighter;
  font-size: 18px;
  user-select: none;
  cursor: pointer;
  transition: 0.2s ease;
}

.search-button:hover {
  filter: brightness(0.9);
}

.search-button:active {
  filter: brightness(0.8);
}

.search-block {
  display: flex;
  justify-content: center;
}

.country-block {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.skills-block {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.search-input {
  width: calc(100% - 300px);
  padding: 15px 20px;
  color: #fafafa;
  font-size: 18px;
  font-weight: lighter;
  border-radius: 4px 0 0 4px;
  background-color: #252526;
}

.system-filter-box {
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.system-filter-title {
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 22px;
  font-weight: lighter;
  padding: 20px 30px;
}

.filter-button {
  padding: 10px 20px;
  border-radius: 4px;
  transition: 0.4s ease;
  cursor: pointer;
  margin-left: auto;
  background-color: #1e1e1e;
  user-select: none;
}

.filter-button:hover {
  filter: brightness(0.9);
}

.filter-button:active {
  filter: brightness(0.8);
}

.system-filter-content {
  padding: 10px 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

input {
  background: none;
  outline: none;
  border: none;
}

input:focus {
  border: none;
}

.flag-button {
  cursor: pointer;
  user-select: none;
  transition: 0.2s ease;
  margin-right: 15px;
  margin-bottom: 15px;
  transition: 0.2s ease;
}

.flag-button:hover {
  filter: brightness(0.8);
}

.global-button {
  width: 39px;
  height: 26px;
  border-radius: 4px;
  font-weight: lighter;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(40, 53, 147, 1);
}

.skill-button {
  padding: 10px 20px;
  border-radius: 4px;
  transition: 0.2s ease;
  cursor: pointer;
  user-select: none;
  font-weight: lighter;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #37474F;
  margin-right: 15px;
  margin-bottom: 15px;
}

.skill-button:hover {
  filter: brightness(0.9);
}

.skill-button:active {
  filter: brightness(0.8);
}

.skill-button-selected {
  background-color: rgba(211,47,47 ,1);
}
</style>

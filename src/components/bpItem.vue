<template>
  <div class="bp-item">
    <div class="bp-title-box">
      <img class="bp-cover" :src="`https://assets.ppy.sh/beatmaps/${bp.SetID}/covers/cover.jpg`" />
      <div class="bp-content">
        <div
          style="display: flex; border-radius: 4px; height: 80px; font-size: 24px; font-weight: lighter; justify-content: center; padding-top: 30px;"
        >
          <div>{{bp.Artist}}</div>
          <div style="margin: 0 5px;">/</div>
          <div style="max-width: 500px;">
            <a :href="`https://osu.ppy.sh/beatmapsets/${bp.SetID}#osu/${bp.BeatmapID}`">{{bp.Title}}</a>
          </div>
          <div
            style="margin: 0 10px; max-width: 200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;"
          >[ {{bp.Version}} ]</div>
          <div style="margin: 0 5px;">/</div>
          <div style="font-size: 26px;">{{bp.Rank}}</div>
        </div>
        <div
          style="font-weight: lighter; display: flex; align-items: center; justify-content: center;"
        >
          <div style="font-size: 22px; font-weight: bold; color: rgba(255,245,157 ,1);">
            <span>PP+:</span>
            <span>{{bp.Total.toFixed(2)}}</span>
          </div>

          <div style="margin-left: 15px;">/</div>

          <div style="margin-left: 15px; color: rgba(239,154,154 ,1);">
            <span>COMBO:</span>
            <span>{{bp.Combo}}</span>
          </div>

          <div style="margin-left: 15px;">
            <span>ACC:</span>
            <span>{{(bp.AccuracyPercent * 100).toFixed(2) + '%'}}</span>
          </div>

          <div style="margin-left: 15px; color: rgba(121,134,203 ,1);">
            <span>Count300:</span>
            <span>{{bp.Count300}}</span>
          </div>
          <div style="margin-left: 15px; color: rgba(174,213,129 ,1);">
            <span>Count100:</span>
            <span>{{bp.Count100}}</span>
          </div>
          <div style="margin-left: 15px; color: rgba(255,183,77 ,1);">
            <span>Count50:</span>
            <span>{{bp.Count50}}</span>
          </div>
        </div>

        <div class="pp-plus-box">
          <div>
            <span>JumpAim:</span>
            <span>{{Math.round(bp.JumpAim)}}</span>
          </div>
          <div>
            <span>FlowAim:</span>
            <span>{{Math.round(bp.FlowAim)}}</span>
          </div>
          <div>
            <span>Speed:</span>
            <span>{{Math.round(bp.Speed)}}</span>
          </div>
          <div>
            <span>Stamina:</span>
            <span>{{Math.round(bp.Stamina)}}</span>
          </div>
          <div>
            <span>Accuracy:</span>
            <span>{{Math.round(bp.Accuracy)}}</span>
          </div>
          <div>
            <span>Precision:</span>
            <span>{{Math.round(bp.Precision)}}</span>
          </div>
        </div>

        <div style="margin-top: 20px;">
          <span>{{bp.Date}}</span>
        </div>
        <div style="margin-top: 15px;">
          <span>EnabledMods:</span>
          <span>{{bp.EnabledMods}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bp: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.bp-content {
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  flex: 1;
  height: 100%;
  width: 100%;
  display: flex;
  border-radius: 4px;
  text-shadow: 0 2px 4px #000000;
  border: 2px solid rgba(244, 67, 54, 1);
}

.bp-title-box {
  position: relative;
  max-height: 250px;
  max-width: 900px;
}

.bp-cover {
  filter: blur(4px) brightness(0.4);
  border-radius: 4px;
}

.pp-plus-box {
  font-weight: lighter;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  font-size: 16px;
}

.pp-plus-box > div {
  margin-right: 15px;
}

.pp-plus-box > div > span {
  margin-right: 5px;
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
</style>

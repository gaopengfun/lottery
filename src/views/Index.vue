<template>
  <div class="index">
    <h1 class="title">精准教学-码上奥斯卡</h1>
    <a
      class="to-result"
      href="javascript:"
      @click="toResult">抽奖结果</a>

    <canvas
      id="tagCanvas"
      ref="canvas"
      width="800px"
      height="600px"/>

    <div
      id="names"
      class="names">
      <ul>
        <li
          v-for="(val, index) in members"
          :key="'name-' + index">
          <a
            :style="getStyle()"
            href="javascript:;">{{ val.name }}</a>
        </li>
      </ul>
    </div>

    <div class="tools">
      <div class="choose">
        <span class="label">单次中奖人数：</span>
        <el-radio
          v-for="(val, index) in onceNumSet"
          :key="'once-' + index"
          v-model="onceNum"
          :label="val">{{ val }}人</el-radio>
      </div>
      <div class="btns">
        <el-button
          type="primary"
          @click="toggleWin">{{ running? '停止' : '开始' }}</el-button>
        <el-button
          type="info"
          @click="reset">重置</el-button>
      </div>
    </div>

    <transition name="bounceIn">
      <div
        v-show="showWin"
        class="had-win">
        <span
          v-for="(val, index) in current"
          :key="'tag-win-' + index">{{ val }}</span>
      </div>
    </transition>

    <!-- 音频 -->
    <audio
      ref="audioWin"
      src="https://test.zhixue.com/zxfe/static/happy.mp3"
      autoplay
      loop/>
  </div>
</template>

<script>
import members from '../utils/members';
import fontStyle from '../utils/fontStyle';
import { setLocalStorage, getLocalStorage, removeLocalStorage } from '../utils/storageUtil';
const WIN_KEY = 'had-win';
const RESULT_KEY = 'result-win';
export default {
  name: 'Index',
  data() {
    return {
      members: members,
      running: false,
      current: [],
      hadWin: [],
      showWin: false,
      onceNumSet: [1, 2, 3, 5, 10],
      onceNum: 1,
      level: this.$route.query.level || 11
    };
  },
  created() {
    this.hadWin = getLocalStorage(WIN_KEY) || [];
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.canvas.width = document.documentElement.clientWidth;
      this.$refs.canvas.height = document.documentElement.clientHeight - 80;

      window.TagCanvas.Start('tagCanvas', 'names', {
        textFont: null,
        textColour: null,
        weight: true,
        wheelZoom: false,
        initial: [0.1, 0.1],
        noMouse: true
      });
    });
  },
  methods: {
    getStyle() {
      let style = fontStyle();
      return {
        color: style.color,
        fontSize: style.fontSize,
        fontWeight: style.fontWeight
      };
    },
    getColor() {
      let style = fontStyle();
      return {
        color: style.color
      };
    },
    lottery() {
      let currentWin = this.members
        .filter(m => {
          return !this.hadWin.includes(m.name);
        })
        .map(m => {
          return Object.assign({
            sort: Math.random()
          }, m);
        })
        .sort((a, b) => {
          return a.sort - b.sort;
        })
        .slice(0, this.onceNum)
        .map(m => {
          this.hadWin.push(m.name);
          return m.name;
        });

      this.current = currentWin.slice(0);
      setLocalStorage(WIN_KEY, this.hadWin);
      this.setResult(this.current);
    },
    toggleWin() {
      this.audioPlay();

      if (this.running) {
        // 结束抽奖
        window.TagCanvas.SetSpeed('tagCanvas', [0.1, 0.1]);
        this.lottery();
        this.showWin = true;
      } else {
        // 开始抽奖
        this.showWin = false;

        let filterMember = this.members
          .filter((m) => {
            return !this.hadWin.includes(m.name);
          });
        if (this.onceNum > filterMember.length) {
          this.$message.error('抽奖人数不足');
          return;
        }

        // window.TagCanvas.SetSpeed('tagCanvas', [5, 1]);
        window.TagCanvas.SetSpeed('tagCanvas', [5, 20]);
      }

      this.running = !this.running;
    },
    audioPlay() {
      if (this.$refs.audioWin.paused) {
        this.$refs.audioWin.play();
      } else {
        this.$refs.audioWin.pause();
      }
    },
    reset() {
      this.$confirm('此操作将清楚抽奖记录, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeLocalStorage(WIN_KEY);
        removeLocalStorage(RESULT_KEY);
        removeLocalStorage('member');
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        setTimeout(_ => {
          window.location.reload();
        }, 1500);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    setResult(data) {
      let result = getLocalStorage(RESULT_KEY) || {};
      if (result[this.level]) {
        result[this.level] = result[this.level].concat(data);
      } else {
        result[this.level] = data;
      }
      console.log('result', result);
      setLocalStorage(RESULT_KEY, result);
    },
    toResult() {
      // this.$router.push('/result');
      const { href } = this.$router.resolve({
        path: '/result'
      });
      window.open(href, '_blank');
    }
  }
};
</script>

<style lang="scss" scoped>
.index {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #05101c;
  overflow: hidden;
  .title {
    line-height: 40px;
    font-size: 40px;
    font-weight: bold;
    color: #e6ffff;
    text-shadow: 0px 0px 10px rgba(146, 255, 255, 0.44);
    background: -webkit-gradient(linear, left top, left bottom, from(#f4ffff), to(#e6ffff));
    background: linear-gradient(180deg, #f4ffff 0%, #e6ffff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: left;
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .to-result {
    position: absolute;
    right: 20px;
    top: 22px;
    font-size: 24px;
    color: #fff;
  }
  .canvas {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    overflow: hidden;
    margin-top: 40px;
  }
  .names {
    display: none;
  }
  .had-win {
    position: fixed;
    width: 400px;
    height: 400px;
    left: 50%;
    top: 50%;
    margin-left: -200px;
    margin-top: -200px;
    background: #0B1E47;
    box-sizing: border-box;
    padding: 20px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    align-content: center;
    span {
      display: inline-block;
      width: 118px;
      font-size: 32px;
      color: #fff;
      text-align: center;
      line-height: 60px;
    }
  }
  .tools {
    position: absolute;
    width: 100%;
    padding: 0 20px;
    bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .choose {
      .label {
        font-size: 16px;
        color: #fff;
      }
    }
  }
}
</style>

<style lang="scss">
.bounceIn-enter-active {
  animation: bounceIn .75s;
}
.bounceIn-leave-active {
  animation: bounceIn .1s reverse;
}

@keyframes bounceIn {
  from,
  20%,
  40%,
  60%,
  80%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  20% {
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    transform: scale3d(0.9, 0.9, 0.9);
  }

  60% {
    opacity: 1;
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    transform: scale3d(0.97, 0.97, 0.97);
  }

  to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
}
</style>

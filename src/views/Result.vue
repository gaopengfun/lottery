<template>
  <div class="result">
    <h1 class="title">[精准教学-码上奥斯卡]-中奖名单</h1>

    <div
      v-if="showWin"
      class="members">
      <div
        v-for="(item, key) in hadWin"
        :key="'win-level-' + key"
        class="members-list">
        <p>{{ getPrizeName(key) }}</p>
        <ul>
          <li
            v-for="(val, key) in item"
            :key="'win-' + key">{{ val }}</li>
          <i
            v-for="num in 20"
            :key="'place-' + num">{{ num }}</i>
        </ul>
      </div>
    </div>

    <div
      v-else
      class="members-none">
      <p>暂无中奖名单</p>
    </div>
  </div>
</template>

<script>
import { getLocalStorage } from '../utils/storageUtil';
const RESULT_KEY = 'result-win';
export default {
  name: 'Result',
  data() {
    return {
      hadWin: [],
      showWin: false
    };
  },
  created() {
    this.hadWin = getLocalStorage(RESULT_KEY) || {};
    this.showWin = Object.keys(this.hadWin).length > 0;
    console.log(this.hadWin);
  },
  methods: {
    getPrizeName(index) {
      const SET_NAME = {
        1: '一等奖',
        2: '二等奖',
        3: '三等奖',
        4: '四等奖',
        5: '五等奖',
        6: '六等奖'
      };
      return SET_NAME[index] || '鼓励奖';
    }
  }
};
</script>
<style lang="scss" scoped>
.result {
  h1 {
    line-height: 40px;
    font-size: 40px;
    font-weight: bold;
    color: #e6ffff;
    text-shadow: 0px 0px 10px rgba(146, 255, 255, 0.44);
    background: -webkit-gradient(linear, left top, left bottom, from(#f4ffff), to(#e6ffff));
    background: linear-gradient(180deg, #f4ffff 0%, #e6ffff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: center;
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .members {
    margin-top: 60px;
    padding-left: 100px;
    padding-right: 100px;
    &-list {
      p {
        font-size: 40px;
        color: #fff;
        text-align: center;
        background: #0B1E47;
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 30px;
        margin-bottom: 30px;
        li {
          display: inline-block;
          width: 120px;
          font-size: 28px;
          color: #fff;
          padding: 10px 0;
          text-align: center;
        }
        i {
          width: 120px;
          font-size: 28px;
          color: #fff;
          height: 1px;
          text-indent: -1000px;
          overflow: hidden;
        }
      }
    }
  }
  .members-none {
    margin-top: 60px;
    p {
      font-size: 20px;
      color: #aaa;
      text-align: center;
    }
  }
}
</style>

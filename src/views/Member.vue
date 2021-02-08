<template>
  <div class="member">
    <div class="code">
      代码地址(欢迎监督和Review)：https://git.iflytek.com/QT_ZXKJ_ZXPR/project/webapp/web-activity-win.git
    </div>

    <ul>
      <li
        v-for="(val, key) in members"
        :key="'win-' + key">{{ val.name }}</li>
      <i
        v-for="num in 20"
        :key="'place-' + num">{{ num }}</i>
    </ul>

    <p>共有 {{ members.length }} 人</p>

    <el-input
      v-show="showArea"
      v-model="textarea"
      :rows="5"
      class="area"
      type="textarea"
      placeholder="请输入补录名单，多个人以中文'，'分隔"/>

    <div class="btns">
      <el-button
        type="primary"
        @click="addMember">{{ showArea? '确定补录' : '补录名单' }}</el-button>
    </div>
  </div>
</template>

<script>
import members from '../utils/members';
import { setLocalStorage } from '../utils/storageUtil';
export default {
  name: 'Member',
  data() {
    return {
      members: members,
      textarea: '',
      showArea: false
    };
  },
  created() {},
  methods: {
    addMember() {
      if (this.showArea) {
        // 确认名单
        if (!this.textarea) {
          this.$message.error('请输入补录名单');
          return;
        }
        let names = this.textarea.split('，');
        names.forEach(item => {
          this.members.push({
            name: item
          });
        });
        setLocalStorage('member', this.members);
        this.textarea = '';
        this.$message.success('添加成功');
      } else {
        this.showArea = true;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.member {
  padding: 50px 80px;
  .code {
    font-size: 18px;
    color: #fff;
    margin-bottom: 20px;
    text-align: center;
    padding: 10px;
    background: #0B1E47;
  }
  & > ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
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
  & > p {
    font-size: 20px;
    color: #fff;
    text-align: right;
    padding: 15px 0;
  }
  .area {
    margin: 15px 0 30px;
  }
  .btns {
    text-align: right;
  }
}
</style>

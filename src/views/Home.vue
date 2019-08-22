<template>
  <div class="wraper">
    <lottery
      @lotteryClick="lotteryClick"
      @lotteryDone="lotteryDone"
      :lottery-start="lotteryStart"
      :lottery-prizenum="prizeNum"
      :lottery-prizeno="prizeNo"
      :lottery-bg="require('../assets/turnplate-bg.png')"
      :content-bg="require('../assets/turntable.png')"
      :pointer-bg="require('../assets/pointer.png')"
      :lottery-width="['85%','35%']"
    />
    <dialog-bar
      v-model="sendVal"
      type="confirm"
      :title="title"
      :content="content"
      @confirm="clickConfirm()"
      :confirmText="confirmText"
    ></dialog-bar>
    <div class="contain">
      <label v-for="(prize,index) in prizeList" v-bind:key="prize.value" style="float:left">
        <input type="radio" :id="index" :value="prize.key" v-model="selectIndex" />
        {{prize.label}}
      </label>
      <br />
    </div>
  </div>
</template>

<script>
import dialogBar from "@/components/dialog.vue";
export default {
  name: "Wheel",
  components: {
    "dialog-bar": dialogBar
  },
  data() {
    return {
      lotteryStart: 0,
      prizeNo: 0,
      prizeNum: 8,
      selectIndex: 5,
      prizeList: [
        { key: 1, label: "200万里通积分" },
        { key: 2, label: "288元万里通积分红包" },
        { key: 3, label: "50万里通积分" },
        { key: 4, label: "10万里通积分" },
        { key: 5, label: "感谢参与" },
        { key: 6, label: "88元万里通积分红包" },
        { key: 7, label: "100万里通积分" },
        { key: 8, label: "888元万里通积分红包" }
      ],
      sendVal: false,
      title: `恭喜`,
      content: ``,
      confirmText: `领取`
    };
  },
  methods: {
    lotteryClick() {
      this.lotteryStart = 1;
      this.prizeNo = this.selectIndex;
    },
    lotteryDone(res) {
      this.lotteryStart = 0;
      let index = res.prizeNo - 1;
      if (index == 4) {
        this.title = "很遗憾";
        this.content = `您的手气似乎不太给力啊!`;
        this.confirmText = `谢谢`;
      } else {
        this.title = "恭喜";
        this.content = `您抽中了${this.prizeList[index].label}`;
      }
      this.sendVal = !this.sendVal;
    },
    openMask(index) {
      this.sendVal = true;
    },
    clickConfirm() {
      console.log("点击了confirm");
    }
  },
  created() {
    let _this = this;
    document.onkeydown = e => {
      var key = e.keyCode;
      console.log("按键：%s", key);
      if (key == 32) {
        _this.lotteryClick();
      }
    };
  }
};
</script>

<style scoped>
.lottery_wraper {
  max-width: 50% !important;
}
.wraper {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 0 auto;
}
.contain {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #333;
  text-align: left;
}
</style>
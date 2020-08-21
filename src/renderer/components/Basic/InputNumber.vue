<template>
  <div class="inputNumber-wrapper">
    <!-- <input :value="currentVal" @change="fixNumber" />
    <input type="button" value="+" @click="buttonClick(1)" />
    <input type="button" value="-" @click="buttonClick(-1)" />-->

    <button type="button" @mousedown="buttonMousedown()" @mouseup="buttonMouseup()">-</button>
    <input class="mui-numbox-input" type="text" :value="currentVal" />
    <!-- <button
      type="button"
      @touchstart="Loop_Add(item.CartID)"
    >+</button>-->
  </div>
</template>

<script>
export default {
  name: "inputnumber",
  data() {
    return {
      timeInterval: null,
      currentVal: this.value,
      isClickButton: false,
    };
  },
  components: {},
  props: {
    value: {
      type: Number,
      default: 10,
    },
    maxNum: {
      type: Number,
      default: Infinity,
    },
    minNum: {
      type: Number,
      default: -Infinity,
    },
    step: {
      type: Number,
      default: 1,
    },
  },
  watch: {
    currentVal(val) {
      console.log("子组件currentVal值改变");
      this.$emit("input", val);
    },
  },
  methods: {
    fixNumber($event) {
      let fix;
      if (typeof $event.target.value != "number") {
        fix = Number($event.target.value.replace(/\D/g, ""));
      } else {
        fix = $event.target.value;
      }
      this.updateVal(fix);
    },
    updateVal(val) {
      if (val > this.maxNum) val = this.maxNum;
      if (val < this.minNum) val = this.minNum;
      this.currentVal = val;
    },
    buttonClick(flag) {
      if (flag > 0) {
        this.currentVal < this.maxNum
          ? (this.currentVal += this.step)
          : this.maxNum;
        this.updateVal(this.currentVal);
      } else {
        this.currentVal > this.minNum
          ? (this.currentVal -= this.step)
          : this.minNum;
        this.updateVal(this.currentVal);
      }
    },
    buttonMousedown() {
      this.isClickButton = true;
      this.addClickTimeInterval();
    },
    buttonMouseup() {
      this.clearTimeInterval();
    },
    addClickTimeInterval() {
      console.log("addClickTimeInterval");
      this.timeInterval = setInterval(() => {
        this.buttonClick(1);
      }, 100);
    },
    clearTimeInterval() {
      if (this.timeInterval == null) return;
      console.log("clearTimeInterval");
      clearInterval(this.timeInterval);
      this.timeInterval = null;
    },
  },
};
</script>

<style scoped>
.button {
  width: 64px;
  height: 64px;
}
</style>
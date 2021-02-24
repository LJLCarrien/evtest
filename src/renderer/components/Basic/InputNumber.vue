<template>
  <div class="inputNumber-wrapper" :id="itemId">
    <input
      class="numboxInput"
      :style="inputStyle"
      type="number"
      :value="currentVal"
      @change="fixNumber"
      @mouseenter="inputMouseEnter"
      @mouseleave="inputMouseLeave"
    />
    <button
      id="reduceBtn"
      :class="reduceBtnClass"
      @mousedown="buttonMousedown(-1)"
      @mouseenter="inputMouseEnter"
      @mouseleave="inputMouseLeave"
      @mouseout="buttonMouseOut"
      @mouseup="buttonMouseup()"
    >
      -
    </button>
    <button
      id="addBtn"
      :class="addBtnClass"
      @mousedown="buttonMousedown(1)"
      @mouseenter="inputMouseEnter"
      @mouseleave="inputMouseLeave"
      @mouseout="buttonMouseOut"
      @mouseup="buttonMouseup()"
    >
      +
    </button>
  </div>
</template>

<script>
export default {
  name: "inputnumber",
  data() {
    return {
      addBtnClass: "btn",
      reduceBtnClass: "btn",
      inputStyle: {
        "border-color": "",
      },
      timeInterval: null,
      currentVal: this.value,
      isClickButton: false,
    };
  },
  components: {},
  props: {
    id: {
      type: Number,
      default: -1,
    },
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
    value(val) {
      // console.log(val);
      this.currentVal = val;
    },
    currentVal(val) {
      // console.log("子组件currentVal值改变: " + val);
      this.$emit("input", val);
    },
  },
  computed: {
    itemId() {
      return "inpuNumberId_"+this.id;
    },
  },
  methods: {
    /**
     * 交互效果 enter-变蓝
     */
    inputMouseEnter() {
      this.updateInputBorder(true);
      this.updateCursor();
    },
    /**
     * 交互效果 leave-恢复
     */
    inputMouseLeave() {
      this.updateInputBorder(false);
      this.updateCursor();
    },
    /**
     * 交互效果 input边框
     */
    updateInputBorder(isChanging) {
      if (isChanging) {
        this.inputStyle["border-color"] = "#409eff";
      } else {
        this.inputStyle["border-color"] = "";
      }
    },
    fixNumber($event) {
      let fix;
      if (typeof $event.target.value != "number") {
        fix = Number($event.target.value);
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
    /**
     * flag : +/-
     * offset ：一次加/减的值
     */
    updateOffset(flag, offset) {
      this.$emit("update-size", flag*offset,this.itemId);
      let isCanSet = false;
      if (flag > 0) {
        this.currentVal =
          this.currentVal < this.maxNum
            ? this.currentVal + offset
            : this.maxNum;
        this.updateVal(this.currentVal);
        this.updateCursor();
      } else if (flag < 0) {
        this.currentVal =
          this.currentVal > this.minNum
            ? this.currentVal - offset
            : this.minNum;
        this.updateVal(this.currentVal);
        this.updateCursor();
      }
    },
    updateCursor() {
      this.addBtnClass =
        this.currentVal < this.maxNum ? "btn" : "btn btn_is-disabled";
      this.reduceBtnClass =
        this.currentVal > this.minNum ? "btn" : "btn btn_is-disabled";
    },
    buttonClick(flag) {
      this.updateOffset(flag, this.step);
    },
    buttonMousedown(flag) {
      this.isClickButton = true;
      this.clearTimeInterval();
      if (flag > 0) {
        this.timeInterval = setInterval(() => {
          this.buttonClick(1);
        }, 100);
      } else if (flag < 0) {
        this.timeInterval = setInterval(() => {
          this.buttonClick(-1);
        }, 100);
      }
    },
    buttonMouseOut() {
      this.clearTimeInterval();
    },
    buttonMouseup() {
      this.isClickButton = false;
      this.clearTimeInterval();
    },
    clearTimeInterval() {
      if (this.timeInterval == null) return;
      clearInterval(this.timeInterval);
      this.timeInterval = null;
    },
  },
};
</script>

<style scoped>
/**去掉上下箭头 */
.inputNumber-wrapper {
  width: 180px;
  height: 40px;
  display: flex;
  position: relative;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}

/**输入框 */
.numboxInput {
  text-align: center;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: none;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
  padding-left: 15px;
  padding-right: 50px;
}
.numboxInput:hover {
  border-color: #c0c4cc;
}
.numboxInput_changing {
  border-color: #409eff;
}
.numboxInput:focus {
  border-color: #409eff;
}

/**按钮们 */
.btn {
  position: absolute;
  z-index: 1;
  width: 41px;
  height: auto;
  text-align: center;
  background: #f5f7fa;
  color: #606266;
  cursor: pointer;
  font-size: 13px;
  line-height: 19px;
  border: none;
  border-right: none;
  border-left: 1px solid #dcdfe6;
}
.btn:focus {
  outline: none;
}
.btn:hover {
  color: #409eff;
}
.btn_is-disabled {
  cursor: not-allowed;
}
#reduceBtn {
  right: 1px;
  bottom: 1px;
  top: auto;
  left: auto;
  border-radius: 0 0 4px 0;
}
#addBtn {
  top: 1px;
  right: 1px;
  border-radius: 0 4px 0 0;
  border-bottom: 1px solid #dcdfe6;
}
</style>
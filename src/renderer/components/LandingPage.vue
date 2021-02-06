<template>
  <div id="wrapper" @mouseup="pageMouseUp" @mousemove="pageMouseMove">
    <main>
      <div class="left-side">
        <system-information>
          <span>{{ hello }}</span>
          <input-number
            :value="1"
            :max-num="Number.MAX_VALUE"
            :min-num="0"
            ref="rightSide_inpunumber"
          >
          </input-number>
        </system-information>
      </div>

      <div class="right-side">
        <sketch v-model="colors1"></sketch>

        <photoshop v-model="colors"></photoshop>

        <input-number
          :value="1"
          :max-num="Number.MAX_VALUE"
          :min-num="0"
          ref="rightSide_inpunumber"
          @test1="test1"
        >
        </input-number>
      </div>
    </main>
  </div>
</template>

<script>
import SystemInformation from "./LandingPage/SystemInformation";
import InputNumber from "./Basic/InputNumber";
import { Photoshop, Sketch } from "vue-color";

export default {
  name: "landing-page",
  components: {
    SystemInformation,
    InputNumber,
    Photoshop,
    Sketch,
  },
  data() {
    return {
      oldclientY: -1,
      hello: "你好啊",
      colors1: {
        hex: "#194d33",
        hex8: "#194D33A8",
        hsl: { h: 150, s: 0.5, l: 0.2, a: 1 },
        hsv: { h: 150, s: 0.66, v: 0.3, a: 1 },
        rgba: { r: 25, g: 77, b: 51, a: 1 },
        a: 1,
      },
      colors: {
        hex: "#194d33",
        hsl: {
          h: 150,
          s: 0.5,
          l: 0.2,
          a: 1,
        },
        hsv: {
          h: 150,
          s: 0.66,
          v: 0.3,
          a: 1,
        },
        rgba: {
          r: 25,
          g: 77,
          b: 51,
          a: 1,
        },
        a: 1,
      },
    };
  },
  methods: {
    //颜色值有修改
    updateValue: function (value) {
      console.log("colorChange", value);
    },
    test1() {
      console.log("test1---------------------");
    },
    pageMouseUp() {
      // console.log("pageMouseUp");
      this.$refs.rightSide_inpunumber.buttonMouseup();
    },
    pageMouseMove(e) {
      let offsetY = e.clientY - this.oldclientY;
      let flag = 0;
      if (offsetY > 0) {
        flag = 1;
      } else if (offsetY < 0) {
        flag = -1;
      }
      this.oldclientY = e.clientY;
      if (offsetY != 0 && this.$refs.rightSide_inpunumber.isClickButton) {
        offsetY = Math.abs(offsetY);
        this.$refs.rightSide_inpunumber.updateOffset(flag, offsetY);
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Source Sans Pro", sans-serif;
}

#wrapper {
  background: radial-gradient(
    ellipse at top left,
    rgba(255, 255, 255, 1) 40%,
    rgba(229, 229, 229, 0.9) 100%
  );
  height: 100vh;
  padding: 60px 80px;
  width: 100vw;
}

main {
  display: flex;
  justify-content: space-between;
}

main > div {
  flex-basis: 50%;
}

.left-side {
  display: flex;
  flex-direction: column;
}

.welcome {
  color: #555;
  font-size: 23px;
  margin-bottom: 10px;
}

.title {
  color: #2c3e50;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
}
</style>

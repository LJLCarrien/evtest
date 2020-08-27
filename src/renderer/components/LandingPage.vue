<template>
  <div id="wrapper" @mouseup="pageMouseUp" @mousemove="pageMouseMove">
    <main>
      <div class="left-side">
        <system-information></system-information>
      </div>

      <div class="right-side">
        <input-number
          :value="1"
          :max-num="Number.MAX_VALUE"
          :min-num="0"
          ref="rightSide_inpunumber"
        ></input-number>
      </div>
      <input type="button" value="开始" @click="clickStartBtn" />
      <input type="button" value="结束" @click="clickEndBtn" />
    </main>
  </div>
</template>

<script>
import SystemInformation from "./LandingPage/SystemInformation";
import InputNumber from "./Basic/InputNumber";

export default {
  name: "landing-page",
  components: { SystemInformation, InputNumber },
  data() {
    return {
      oldclientY: -1,
    };
  },
  methods: {
    clickStartBtn() {
      this.$electron.ipcRenderer.send("clickStartBtn");
    },
    clickEndBtn() {
      this.$electron.ipcRenderer.send("clickEndBtn");
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

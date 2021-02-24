<template>
  <div id="wrapper" @mouseup="pageMouseUp" @mousemove="pageMouseMove">
    <main>
      <div class="left-side">
        <system-information></system-information>
        <input-number
          :value="1"
          :min-num="0"
          :max-num="Number.MAX_VALUE"
          ref="rightSide_inpunumber"
        ></input-number>
      </div>

      <div class="right-side">
        <RecycleScroller
          class="scroller"
          :items="list"
          :item-size="40"
          :key-field="item"
          :buffer="0"
          v-slot="{ item }"
        >
          <input-number
            :value="item.value"
            :id="item.id"
            :min-num="0"
            :max-num="Number.MAX_VALUE"
            @update-size="updatSize"
          ></input-number>
        </RecycleScroller>
      </div>
    </main>
  </div>
</template>

<script>
import SystemInformation from "./LandingPage/SystemInformation";
import InputNumber from "./Basic/InputNumber";
import { RecycleScroller } from "vue-virtual-scroller";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";

export default {
  name: "landing-page",
  components: { SystemInformation, InputNumber, RecycleScroller },
  data() {
    return {
      oldclientY: -1,
      list: [],
    };
  },
  created: function () {
    for (let index = 0; index < 30; index++) {
      let info = { id: index, value: index };
      this.list.push(info);
    }
  },
  methods: {
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

    /**动态修改高度 */
    updatSize(offset, itemId) {
      let curHeight=document.getElementById(itemId).clientHeight;
      curHeight+=offset;
      // document.getElementById(itemId).style=`height: ${curHeight}px`;
      console.log(`height: ${curHeight}px`);
      console.log(typeof(curHeight));
      document.getElementById(itemId).style=`height: ${curHeight}px`;
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

.scroller {
  height: 150px;
}

.user {
  height: 32%;
  padding: 0 12px;
  display: flex;
  align-items: center;
}
</style>

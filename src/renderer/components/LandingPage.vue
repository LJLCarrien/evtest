<template>
  <div id="wrapper">
    <main>
      <div class="left-side">
        <system-information></system-information>
      </div>

      <div class="right-side">
        <div class="btnGroup">
          <div class="btn" @click="onClickBtn('add')">增加</div>
          <input v-model="delIndex" />
          <div class="btn" @click="onClickBtn('del')">删除</div>
        </div>
        <div class="color-list">
          <div
            class="color-item"
            v-for="color in colors"
            v-dragging="{ item: color, list: colors, group: 'color' }"
            :key="color.text"
          >
            {{ color.text }}
          </div>
        </div>
      </div>
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
      delIndex: 0,
      colorIndex: 10,
      colors: [
        {
          text: "Aquamarine",
        },
        {
          text: "Hotpink",
        },
      ],
    };
  },
  mounted() {
    this.$dragging.$on("dragged", (data) => {
      console.log("dragged-----------------");
      console.log(data.draged.text);
      // console.log(value.list);
      // console.log(value);
    });
    this.$dragging.$on("dragend", () => {
      console.log("dragend-----------------");
    });
  },
  methods: {
    onClickBtn: function (type) {
      switch (type) {
        case "add":
          this.colors.push({ text: this.colorIndex });
          this.colorIndex++;
          break;
        case "del":
          this.colors.splice(this.delIndex, 1);
          break;

        default:
          break;
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

.color-list {
  display: flex;
}
.color-item {
  width: 50px;
  height: 50px;
  background-color: #555;
  color: #fff;
  margin-right: 5px;
}

.btnGroup {
  display: flex;
  margin-bottom: 10px;
}
.btn {
  width: 60px;
  height: 60px;
  background-color: #555;
  color: #fff;
  margin-right: 10px;
  text-align: center;
  line-height: 25px;
}
</style>

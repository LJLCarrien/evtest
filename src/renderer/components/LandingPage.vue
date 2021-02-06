<template>
  <div id="wrapper">
    <main>
      <div class="left-side">
        <system-information></system-information>
      </div>

      <div class="right-side">
        <!-- 使用transition-group -->
        <draggable
          class="vueDragwrapper"
          v-model="list"
          ghost-class="ghost"
          @start="drag = true"
          @end="drag = false"
        >
          <transition-group
            class="vueDragGroup"
            type="transition"
            :name="'flip-list'"
          >
            <div v-for="item in list" :key="item" class="vueDrag">
              <p>{{ item }}</p>
            </div>
          </transition-group>
        </draggable>

        <!-- 研究disabled 、sort -->
        <div class="btnGroup">
          <div class="btn" @click="onClickBtn('disabled')">
            :disabled="{{ isDisabled }}"
          </div>
          <div class="btn" @click="onClickBtn('sort')">
            :sort="{{ bChange }}"
          </div>
          <div class="btn" @click="onClickBtn('add')">添加</div>
          <input v-model="delIndex" />
          <div class="btn" @click="onClickBtn('del')">删除</div>
        </div>
        <draggable
          :list="listtmp"
          :disabled="isDisabled"
          :sort="bChange"
          class="list-group"
          ghost-class="ghost"
          @start="onStart"
          @end="onEnd"
        >
          <div
            class="list-group-item"
            v-for="element in listtmp"
            :key="element.name"
          >
            {{ element.name }}
          </div>
        </draggable>

        <!-- 研究group
        :group="{ name: 'people', pull: 'clone', put: false }" 复制到另一个组
         -->
        <draggable
          class="list-group"
          :list="list1"
          :group="{ name: 'people', pull: 'clone', put: false }"
          :clone="cloneDog"
          @change="log"
        >
          <div
            class="list-group-item-big eng"
            v-for="(element, index) in list1"
            :key="element.name"
          >
            name:{{ element.name }} index: {{ index }} id:{{ element.id }}
          </div>
        </draggable>

        <draggable
          class="list-group"
          :list="list2"
          group="people"
          @change="log"
        >
          <div
            class="list-group-item-big num"
            v-for="(element, index) in list2"
            :key="element.name"
          >
            name:{{ element.name }} index: {{ index }} id:{{ element.id }}
          </div>
        </draggable>
      </div>
    </main>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import SystemInformation from "./LandingPage/SystemInformation";
import InputNumber from "./Basic/InputNumber";

export default {
  name: "landing-page",
  components: { SystemInformation, InputNumber, draggable },
  data() {
    return {
      oldclientY: -1,
      list: [1, 2, 34, 4, 54, 5],
      drag: false,
      addIndex: 3,
      delIndex: 0,
      listtmp: [
        { name: "t0", id: 0 },
        { name: "t1", id: 1 },
        { name: "t2", id: 2 },
      ],
      isDisabled: false,
      bChange: true,
      list1: [
        { name: "a", id: 1 },
        { name: "b", id: 2 },
        { name: "c", id: 3 },
        { name: "d", id: 4 },
      ],
      list2: [
        { name: "5", id: 5 },
        { name: "6", id: 6 },
        { name: "7", id: 7 },
      ],
      idGlobal: 8,
    };
  },
  updated() {
    console.log("updated", this.list);
    // this.list1.forEach((item) => {
    //   console.log(item.id, item.name);
    // });
  },
  methods: {
    onStart: function (evt) {
      console.log("onStart", evt);
    },
    onEnd: function (evt) {
      console.log("onEnd", evt);
    },
    log: function (evt) {
      window.console.log(evt);
    },
    cloneDog({ name, id }) {
      return {
        id: this.idGlobal++,
        name: `${name},${id}`,
      };
    },
    onClickBtn(type) {
      switch (type) {
        case "disabled":
          this.isDisabled = !this.isDisabled;
          break;
        case "sort":
          this.bChange = !this.bChange;
          break;
        case "add":
          this.listtmp.push({
            name: "t " + this.addIndex,
            id: this.addIndex,
          });
          this.addIndex++;
          break;
        case "del":
          console.log("del", this.delIndex);
          this.listtmp.splice(this.delIndex, 1);
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

.vueDragwrapper,
.vueDragGroup {
  display: flex;
}
.vueDrag {
  width: 50px;
  height: 50px;
  background-color: #42b983;
  color: #ffffff;
  margin-right: 10px;
}

.list-group {
  display: flex;
  margin-top: 5px;
}

.list-group-item {
  width: 50px;
  height: 50px;
  background-color: #555;
  color: #ffffff;
  margin-right: 10px;
}
.list-group-item-big {
  width: 70px;
  height: 70px;
  color: #ffffff;
  margin-right: 10px;
  background-color: #999;
}
.ghost {
  opacity: 0.4;
}

.btnGroup {
  margin-top: 5px;
  display: flex;
}
.btn {
  width: auto;
  height: 50px;
  background-color: firebrick;
  color: #ffffff;
  margin-right: 5px;
}

.flip-list-move {
  transition: transform 0.2s;
}
.no-move {
  transition: transform 0s;
}
</style>

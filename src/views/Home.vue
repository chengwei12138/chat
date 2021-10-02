<template>
  <div class="home">
    <div class="context">
      <div class="message" v-for="item of data.message" :key="item">
        {{ item }}
      </div>
    </div>
    <div class="input">
      <div>
        a:<input type="text" id="a" v-model="data.sendValue" />
        <button id="A-btn" @click="sendMessage('a')">发送请求</button>
      </div>
      <div>
        b:<input type="text" id="b" v-model="data.sendValue" />
        <button id="B-btn" @click="sendMessage('b')">发送请求</button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  setup() {
    let data = reactive({
      message:[],
      sendValue:''
    })

      var socket = new WebSocket("ws://localhost:3000");
      socket.addEventListener("open", () => {
          data.message.push('连接成功!')
      });
      function sendMessage (id){
        socket.send(id+':'+data.sendValue);
        data.sendValue = '';
      }
      socket.addEventListener("message", (msg) => {
        data.message.push(msg.data)
      });
      return {
        data,
        sendMessage
      }
  }
};
</script>
<style>
body {
  width: 90%;
}
.context {
  width: 800px;
  height: 800px;
  margin-left: 300px;
  background: rgba(202, 176, 57, 0.561);
  overflow-y: scroll;
}
.input {
  width: 800px;
  margin-left: 300px;
  display: flex;
  justify-content: space-between;
}
.message {
  width: 300px;
}
.A {
  width: 100%;
  text-align: left;
}
.B {
  width: 100%;
  text-align: right;
}
</style>
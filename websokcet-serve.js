var ws = require("nodejs-websocket");

const PORT = 3000;
var serve = ws.createServer((conn) => {
  console.log("服务连接成功！");
//   error
  conn.on("error", () => {
    console.log("error");
  });
//   close
  conn.on("close", () => {
    console.log("连接关闭");
  });
  
  // 处理传来的数据
  conn.on("text", (data) => {
    if (data == "") {
      conn.send("发送为空");
    } else {
      conn.send(`${data.toUpperCase()}`);
    }
  });
  
});



serve.listen(PORT, () => {
  console.log("服务启动成功，监听了localhost:" + PORT);
});

页面可见性 API
使用选项卡式浏览，任何给定网页都有可能在后台，因此对用户不可见。页面可见性 API提供了您可以观察的事件，以便了解文档何时可见或隐藏，以及查看页面当前可见性状态的功能。

当用户最小化窗口或切换到另一个选项卡时，API会发送visibilitychange (en-US)事件，让监听者知道页面状态已更改。你可以检测事件并执行某些操作或行为不同。例如，如果您的网络应用正在播放视频，则可以在用户将标签放入背景时暂停视频，并在用户返回标签时恢复播放。 用户不会在视频中丢失位置，视频的音轨不会干扰新前景选项卡中的音频，并且用户在此期间不会错过任何视频。

```
var hidden, visibilityChange;
if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}

var videoElement = document.getElementById("videoElement");

// 如果页面是隐藏状态，则暂停视频
// 如果页面是展示状态，则播放视频
function handleVisibilityChange() {
  if (document[hidden]) {
    videoElement.pause();
  } else {
    videoElement.play();
  }
}

// 如果浏览器不支持addEventListener 或 Page Visibility API 给出警告
if (typeof document.addEventListener === "undefined" || typeof document[hidden] === "undefined") {
  console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
} else {
  // 处理页面可见属性的改变
  document.addEventListener(visibilityChange, handleVisibilityChange, false);

  // 当视频暂停，设置title
  // This shows the paused
  videoElement.addEventListener("pause", function(){
    document.title = 'Paused';
  }, false);

  // 当视频播放，设置title
  videoElement.addEventListener("play", function(){
    document.title = 'Playing';
  }, false);

}
```

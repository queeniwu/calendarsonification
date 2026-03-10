// Runs in content script (isolated) world. Relays "stop" from background to page context.
chrome.runtime.onMessage.addListener(function (request) {
  if (request.action === "stopSonification") {
    window.postMessage({ type: "STOP_SONIFICATION" }, "*");
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({ text: "" });
});

const CALENDAR_URL = "https://calendar.google.com/calendar/";

async function getNextState(tabId) {
  const prevState = await chrome.action.getBadgeText({ tabId });
  return prevState === "ON" ? "OFF" : "ON";
}

async function injectCss(tabId) {
  await chrome.scripting.insertCSS({
    files: ["style.css"],
    target: { tabId },
  });
}

async function injectJs(tabId) {
  await chrome.scripting.executeScript({
    files: ["tone.js", "main.js"],
    target: { tabId },
  });
}

async function removeCss(tabId) {
  await chrome.scripting.removeCSS({
    files: ["style.css"],
    target: { tabId },
  });
}

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id || !tab.url || !tab.url.startsWith(CALENDAR_URL)) return;
  const nextState = await getNextState(tab.id);
  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: nextState === "ON" ? "ON" : "",
  });

  if (nextState === "ON") {
    await injectCss(tab.id);
    await injectJs(tab.id);
  } else {
    try {
      await chrome.tabs.sendMessage(tab.id, { action: "stopSonification" });
    } catch (_) {}
    await removeCss(tab.id);
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "sonificationStopped" && sender.tab?.id) {
    chrome.action.setBadgeText({ tabId: sender.tab.id, text: "" });
    removeCss(sender.tab.id);
  }
});

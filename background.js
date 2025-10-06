// background.js

// When the user clicks on the extension action icon...
chrome.action.onClicked.addListener(async (tab) => {
  // Open the side panel in the current window.
  await chrome.sidePanel.open({ windowId: tab.windowId });
});

chrome.tabs.onUpdated.addListener(function(tabId) {
  chrome.pageAction.show(tabId);
});

chrome.tabs.getSelected(null, function(tab) {
  chrome.pageAction.show(tab.id);
});

chrome.pageAction.onClicked.addListener(function(tab) {
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendMessage(
      tab.id,
      {callFunction: 'toggleSidebar'},
      function(response) {
      }
    );
  });
});


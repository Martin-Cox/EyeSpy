/** Listen to tab update events. When a tab has finished loading, send a message signifying that the tab has loaded. */
chrome.tabs.onUpdated.addListener((tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) =>
{
	if (changeInfo.status === "complete")
	{
		// Notify the EyeSpyController that a tab has loaded.
		chrome.tabs.sendMessage(tabId, { action: "tabLoaded", url: tab.url });
	}
});

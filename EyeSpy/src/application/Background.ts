/**
 * Listen to tab update events. When a tab has finished loading, send a message signifying that the tab has loaded. 
 */
chrome.tabs.onUpdated.addListener((tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) =>
{
	if (changeInfo.status === "complete")
	{
		// Notify EyeSpy that a tab has loaded.
		chrome.tabs.sendMessage(tabId, { action: "tabLoaded", url: tab.url});

		//// Get the active tab in the current window.
		//const activeTab: chrome.tabs.QueryInfo = {
		//	active: true,
		//	currentWindow: true
		//}

		//// Notify EyeSpy that the active tab has loaded.
		//chrome.tabs.query(activeTab, (tabs) =>
		//{
		//	chrome.tabs.sendMessage(tabs[0].id, { action: "tabLoaded", url: tab.url });
		//});
	}
});
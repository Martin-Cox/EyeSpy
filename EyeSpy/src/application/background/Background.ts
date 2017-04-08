/** Listen to tab update events. When a tab has finished loading, send a message signifying that the tab has loaded. */
chrome.tabs.onUpdated.addListener((tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) =>
{
	if (changeInfo.status === "complete")
	{
		// Notify the EyeSpyController that a tab has loaded.
		chrome.tabs.sendMessage(tabId, { action: "tabLoaded", url: tab.url });
	}
});

/**
 * Handler for clicking on the Analyse Image context item.
 */
const analyseImageHandler = (): any =>
{
	return (info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab): void =>
	{
		// Notify the EyeSpyController that a tab has loaded.
		chrome.tabs.sendMessage(tab.id, { action: "analyseImage", url: info.srcUrl });
	};
};

/** Add the EyeSpy context menu item. */
chrome.contextMenus.create({
	contexts: ["image"],
	id: "EyeSpy:AnalyseImage",
	onclick: analyseImageHandler(),
	title: "Analyse Image"
});

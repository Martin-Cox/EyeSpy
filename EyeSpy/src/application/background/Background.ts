import { IMessage, MessageActions } from "../messages/Messages";

/** Listen to tab update events. When a tab has finished loading, send a message signifying that the tab has loaded. */
chrome.tabs.onUpdated.addListener((tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) =>
{
	if (changeInfo.status === "complete")
	{
		// Notify the EyeSpyController that a tab has loaded.
		chrome.tabs.sendMessage(tabId, { action: MessageActions.PageLoad, url: tab.url });
	}
});

/** Respond to events triggered by a content script. */
chrome.runtime.onMessage.addListener((message: IMessage, sender: chrome.runtime.MessageSender, sendResponse: any) =>
{
	switch (message.action)
	{
		case MessageActions.Download:
			downloadFromUrl(message.url);
			break;
		default:
			throw new Error("Unknown message action");
	}
});

/**
 * Downloads a file from the specified url. Uses Chrome's download directory.
 * @param url The url containing the file to download.
 */
const downloadFromUrl = (url: string): void =>
{
	const httpRegex = new RegExp("https?:\/\/");

	// Ensure that the url has a valid protocol. For now we are assuming either http or https, which probably
	// isn't a safe assumption.
	if (!url.match(httpRegex))
	{
		url = `http:${url}`;
	}

	chrome.downloads.download({ url });
};

/**
 * Handler for clicking on the Analyse Image context item.
 */
const analyseImageHandler = (): any =>
{
	return (info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab): void =>
	{
		// Notify the EyeSpyController that an image should be analysed.
		chrome.tabs.sendMessage(tab.id, { action: MessageActions.AnalyseImage, url: info.srcUrl });
	};
};

/** Add the EyeSpy context menu item. */
chrome.contextMenus.create({
	contexts: ["image"],
	id: "EyeSpy:AnalyseImage",
	onclick: analyseImageHandler(),
	title: "Analyse Image"
});

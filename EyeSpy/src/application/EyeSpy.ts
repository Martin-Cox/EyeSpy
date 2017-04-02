﻿/** Responds to "tabLoaded" events triggered by the Background script. */
chrome.runtime.onMessage.addListener((message: any, sender: chrome.runtime.MessageSender, sendResponse: any) =>
{
	if (message.action === "tabLoaded")
	{
		console.log("A Tab has loaded: " + message.url);
	}
});
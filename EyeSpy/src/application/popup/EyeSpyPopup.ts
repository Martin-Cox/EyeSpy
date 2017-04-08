/** JavaScript to be ran on the extension's popup page. */

document.getElementById("scan-page-button").addEventListener("click", () =>
{
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs: chrome.tabs.Tab[]) =>
	{
		chrome.tabs.sendMessage(tabs[0].id, { action: "scanPage" });
	});
});

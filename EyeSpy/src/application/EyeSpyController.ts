import {testString} from "./EyeSpy";

export class EyeSpyController
{
	/**
	 * Creates a new instance of the EyeSpyController.
	 */
	public constructor()
	{
		/** Responds to "tabLoaded" events triggered by the Background script. */
		chrome.runtime.onMessage.addListener((message: any, sender: chrome.runtime.MessageSender, sendResponse: any) =>
		{
			if (message.action === "tabLoaded")
			{
				this._handleTabLoad(message.url);
			}
		});
	}

	private _handleTabLoad(url: string): void
	{
		console.log("A Tab has loaded: " + url);
		console.log("EyeSpyController.js " + testString);
	}
}
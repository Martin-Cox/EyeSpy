import { PageProcessor } from "./PageProcessor";

/**
 * The EyeSpyController class. Contains logic for reacting to browser events.
 */
export class EyeSpyController
{
	 /** The page processor for this tab. */
	private _pageProcessor: PageProcessor;

	/**
	 * Creates a new instance of the EyeSpyController.
	 */
	public constructor()
	{
		this._pageProcessor = new PageProcessor();

		/** Responds to "tabLoaded" events triggered by the Background script. */
		chrome.runtime.onMessage.addListener((message: any, sender: chrome.runtime.MessageSender, sendResponse: any) =>
		{
			if (message.action === "tabLoaded")
			{
				this._handleTabLoad(message.url);
			}
			else if (message.action === "scanPage")
			{
				this._pageProcessor.processPage();
			}
		});
	}

	/**
	 * Handles tabLoad events by beginning the page processor.
	 * @param {string} url The tab url.
	 */
	private _handleTabLoad(url: string): void
	{
		console.log("A Tab has loaded: " + url);

		this._pageProcessor.processPage();
	}
}

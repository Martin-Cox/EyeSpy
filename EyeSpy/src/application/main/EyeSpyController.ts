import { PageProcessor } from "../tab/PageProcessor";

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

		/** Respond to events triggered by the Background script. */
		chrome.runtime.onMessage.addListener((message: any, sender: chrome.runtime.MessageSender, sendResponse: any) =>
		{
			switch (message.action)
			{
				case "tabLoaded":
					this._handleTabLoad(message.url);
					break;
				case "scanPage":
					this._pageProcessor.analysePage();
					break;
				case "analyseImage":
					this._pageProcessor.analyseImage(message.url);
					break;
				default:
					throw new Error("Unknown message action");
			}
		});
	}

	/**
	 * Handles tabLoad events by beginning the page processor.
	 * @param url The tab url.
	 */
	private _handleTabLoad(url: string): void
	{
		// Disable for now to prevent lots of API requets being made during testing.
		// this._pageProcessor.processPage();
	}
}

import { IMessage, MessageActions } from "../messages/Messages";
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

		this.updateClarifaiSettings();

		/** Respond to events triggered by the Background script or Popup. */
		chrome.runtime.onMessage.addListener((message: IMessage, sender: chrome.runtime.MessageSender, sendResponse: any) =>
		{
			switch (message.action)
			{
				case MessageActions.PageLoad:
					this._handlePageLoad(message.url);
					break;
				case MessageActions.ScanPage:
					this._pageProcessor.analysePage();
					break;
				case MessageActions.AnalyseImage:
					this._pageProcessor.analyseImage(message.url);
					break;
				case MessageActions.ClarifaiSettingsChanged:
					this.updateClarifaiSettings();
					break;
				default:
					throw new Error("Unknown message action");
			}
		});
	}

	/**
	 * Handles PageLoad events by beginning the page processor.
	 * @param url The page url.
	 */
	private _handlePageLoad(url: string): void
	{
		this._pageProcessor.analysePage();
	}

	/**
	 * Fetches the Clarifai API settings from Chrome's local storage and notifies the page processor to update.
	 */
	private updateClarifaiSettings(): void
	{
		chrome.storage.sync.get("clarifaiSettings", (response: any) =>
		{
			this._pageProcessor.updateClarifaiSettings(response.clarifaiSettings);
		});
	}
}

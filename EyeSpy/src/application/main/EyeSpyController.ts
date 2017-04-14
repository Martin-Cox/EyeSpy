﻿import { IClarifaiCredentials } from "../keys/Keys";
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

		this._updateClarifaiCredentials();

		/** Respond to events triggered by the Background script or Popup. */
		chrome.runtime.onMessage.addListener((message: IMessage, sender: chrome.runtime.MessageSender, sendResponse: any) =>
		{
			switch (message.action)
			{
				case MessageActions.TabLoad:
					this._handleTabLoad(message.url);
					break;
				case MessageActions.ScanPage:
					this._pageProcessor.analysePage();
					break;
				case MessageActions.AnalyseImage:
					this._pageProcessor.analyseImage(message.url);
					break;
				case MessageActions.CredentialsUpdated:
					this._updateClarifaiCredentials();
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

	/**
	 * Fetches the Clarifai API credentials from Chrome's local storage and notifies the page processor
	 * to update it's credentials.
	 */
	private _updateClarifaiCredentials(): void
	{
		chrome.storage.sync.get("clarifaiCredentials", (response: any) =>
		{
			this._pageProcessor.updateClarifaiCredentials(response.clarifaiCredentials);
		});
	}
}

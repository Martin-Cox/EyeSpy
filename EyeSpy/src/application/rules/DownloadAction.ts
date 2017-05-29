import * as $ from "jquery";

import { IMessage, MessageActions } from "../messages/Messages";
import { IRulesetAction } from "../rules/RulesetAction";

/**
 * The DownloadAction class. Implements the "Download" ruleset action.
 */
export class DownloadAction implements IRulesetAction
{
	public executeAction(imageElement: JQuery): void
	{
		const url = imageElement.attr("src");
		const downLoadMessage: IMessage = {
			action: MessageActions.Download,
			url
		};

		// Notify the background script to download the image.
		chrome.runtime.sendMessage(downLoadMessage);
	}
}

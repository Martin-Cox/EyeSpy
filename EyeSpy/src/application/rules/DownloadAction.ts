import * as $ from "jquery";

import { IRulesetAction } from "../rules/RulesetAction";

/**
 * The DownloadAction class. Implements the "Download" ruleset action.
 */
export class DownloadAction implements IRulesetAction
{
	public executeAction(imageElement: JQuery): void
	{
		console.log("Download image");
	}
}

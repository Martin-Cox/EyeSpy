import * as $ from "jquery";

import { IRulesetAction } from "../rules/RulesetAction";

/**
 * The CaptionAction class. Implements the "Caption" ruleset action.
 */
export class CaptionAction implements IRulesetAction
{
	public executeAction(imageElement: JQuery): void
	{
		console.log("Caption image");
	}
}

import * as $ from "jquery";

import { IRulesetAction } from "../rules/RulesetAction";

/**
 * The BlurAction class. Implements the "Blur" ruleset action.
 */
export class BlurAction implements IRulesetAction
{
	public executeAction(imageElement: JQuery): void
	{
		console.log("Blur image");
	}
}

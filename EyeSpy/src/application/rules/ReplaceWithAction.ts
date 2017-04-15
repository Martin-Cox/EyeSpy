import * as $ from "jquery";

import { IRulesetAction } from "../rules/RulesetAction";

/**
 * The ReplaceWithAction class. Implements the "ReplaceWith" ruleset action.
 */
export class ReplaceWithAction implements IRulesetAction
{
	public executeAction(imageElement: JQuery): void
	{
		this._replaceImage();
	}

	protected replaceImage(): void
	{
		console.log("ReplaceWith image");
	}
}

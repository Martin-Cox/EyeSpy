import * as $ from "jquery";

import { IRulesetAction } from "../rules/RulesetAction";

/**
 * The EditAction class. Implements the "Edit" ruleset action.
 */
export class EditAction implements IRulesetAction
{
	public executeAction(imageElement: JQuery): void
	{
		console.log("Edit image");
	}
}

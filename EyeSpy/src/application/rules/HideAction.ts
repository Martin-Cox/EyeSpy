import * as $ from "jquery";

import { IRulesetAction } from "../rules/RulesetAction";

/**
 * The HideAction class. Implements the "Hide" ruleset action.
 */
export class HideAction implements IRulesetAction
{
	public executeAction(imageElement: JQuery): void
	{
		imageElement.hide();
	}
}

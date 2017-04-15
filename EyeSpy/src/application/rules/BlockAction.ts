import * as $ from "jquery";

import { IRulesetAction } from "../rules/RulesetAction";

/**
 * The BlockAction class. Implements the "Block" ruleset action.
 */
export class BlockAction implements IRulesetAction
{
	public executeAction(imageElement: JQuery): void
	{
		console.log("Block image");
	}
}

import * as $ from "jquery";

import { ReplaceWithAction } from "../rules/ReplaceWithAction";
import { IRulesetAction } from "../rules/RulesetAction";

/**
 * The ReplaceWithSimilar class. Implements the "ReplaceWithSimilar" ruleset action.
 */
export class ReplaceWithSimilarAction extends ReplaceWithAction implements IRulesetAction
{
	public executeAction(imageElement: JQuery): void
	{
		this.replaceImage();
	}
}

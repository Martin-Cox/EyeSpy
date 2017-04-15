import * as $ from "jquery";

/** The actions that will be executed by the RulesetAction. */
export enum RulesetActionType
{
	/** Replaces the image with a black box. */
	Block,

	/** Blurs the image. */
	Blur,

	/** Adds the specified text to the image. */
	Caption,

	/** Downloads the image to the users chosen directory. */
	Download,

	/** Replaces the image with the same one that has been edited. */
	Edit,

	/** Hides the image. */
	Hide,

	/** Replaces the image with one chosen by the user. */
	ReplaceWith,

	/** Places the image with one that has similar contents. */
	ReplaceWithSimilar
}

/** Interface describing the RulesetAction classes. */
export interface IRulesetAction
{
	executeAction(imageElement: JQuery): void;
}

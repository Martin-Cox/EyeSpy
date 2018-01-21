import * as $ from "jquery";

import { IRulesetAction } from "../rules/RulesetAction";

/** The triggers that can begin the evaluation of a ruleset. */
export enum RulesetTrigger
{
	PageLoad,
	MouseEnter
}

/**
 * A set of rules and actions to execute if the rules evaluate to true.
 */
export class Ruleset
{
	/** The trigger that causes this ruleset to be re-evaluated. */
	private _trigger: RulesetTrigger;

	/** The individual rule(s) in the ruleset. */
	private _rules: Rule[];

	/** The actions to take when all of the rules in the ruleset evaluate to true. */
	private _actions: IRulesetAction[];

	/**
	 * Evaluates the image contents against each rule in the ruleset. If all rules evaluate to true, then
	 * all of the actions in ruleset are executed against the image.
	 * @param imageElement The image to execute the actions against.
	 * @param imageContents The results of Clarifai analysing the image.
	 */
	public evaluateAndExecute(imageElement: JQuery, imageContents: any): void
	{
		// Evaluate each rule against the image and get a flag indicating whether all the rules evaluated
		// to true or not.
		const rulesEvaluateTrue = this._rules.every((rule: Rule) =>
		{
			return rule.evaluateRule(imageContents);
		});

		if (rulesEvaluateTrue)
		{
			this._actions.forEach((action: IRulesetAction) =>
			{
				action.executeAction(imageElement);
			});
		}
	}
}

/**
 * A single rule.
 */
export class Rule
{
	private _clarifaiTag: string;

	private _operator: string;

	private _probability: number;

	public constructor(clarifaiTag: string, operator: string, probability: number)
	{
		this._clarifaiTag = clarifaiTag;
		this._operator    = operator;
		this._probability = probability;
	}

	/**
	 * Evaluates the image contents against this rule.
	 * @param imageContents The results of Clarifai analysing the image.
	 * @returns A flag indicating whether the rule evaluated to true or not.
	 */
	public evaluateRule(imageContents: any): boolean
	{
		// NOTE: Pseudocode implementation.
		const matchingConcept = imageContents.where(imageContents.concept.toLowerCase() === this._clarifaiTag.toLowerCase());

		if (matchingConcept)
		{
			switch (this._operator)
			{
				case ">":
					return matchingConcept.probability > this._probability;
				case ">=":
					return matchingConcept.probability >= this._probability;
				case "<":
					return matchingConcept.probability < this._probability;
				case "<=":
					return matchingConcept.probability <= this._probability;
				case "==":
					return matchingConcept.probability === this._probability;
				case "!=":
					return matchingConcept.probability !== this._probability;
				default:
					return false;
			}
		}
		else
		{
			return false;
		}
	}
}

// TODO: Use underscore or Lodash here to simplify the evaluation logic.

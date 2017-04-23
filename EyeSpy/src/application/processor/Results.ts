import * as $ from "jquery";

import { ClarifaiModel } from "../messages/Settings";
import { Result } from "../processor/Result";

/** Stores Clarifai results for a given image. */
export class Results
{
	/** The array of individual image results. */
	private _results: Result[];

	/**
	 * Creates or Updates the results for a given image and Clarifai model.
	 * @param image The image to create or update results for.
	 * @param clarifaiModel The Clarifai model to set the image results on.
	 * @param clarifaiResults The Clarifai results for the image and model.
	 */
	public createOrUpdate(image: JQuery, clarifaiModel: ClarifaiModel, clarifaiResults: any)
	{
		const imageHash = this._generateImageHash(image);

		// See if we already have the images results.
		const existingResult = this._results.filter((result: Result): boolean =>
		{
			return result.imageHash === imageHash;
		})[0];

		if (existingResult)
		{
			// We do have already have the result stored. Set the results for the model.
			existingResult.setResultForModel(clarifaiModel, clarifaiResults);
		}
		else
		{
			// We don't have the results for this image yet. Create one and set the results for the model.
			const newResult = new Result(image, imageHash);

			newResult.setResultForModel(clarifaiModel, clarifaiResults);

			this._results.push(newResult);
		}
	}

	/**
	 * Generates the unique image has for a given image element.
	 * @param image The image to generate the hash for.
	 * @returns The images unique hash.
	 */
	private _generateImageHash(image: JQuery): string
	{
		return "";
	}
}

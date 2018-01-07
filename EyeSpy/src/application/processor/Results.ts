import * as $ from "jquery";
import * as md5 from "md5";

import { ClarifaiModel } from "../messages/Settings";
import { Result } from "../processor/Result";

/** Stores Clarifai results for a given image. */
export class Results
{
	/** The array of individual image results. */
	private _results: Result[] = [];

	/**
	 * Creates or updates the results for a given image and Clarifai model.
	 * @param image The image to create or update results for.
	 * @param clarifaiModel The Clarifai model to set the image results on.
	 * @param clarifaiResults The Clarifai results for the image and model.
	 */
	public createOrUpdate(image: JQuery, clarifaiModel: ClarifaiModel, clarifaiResults: any): void
	{
		const imageHash      = this._generateImageHash(image);
		const existingResult = this._getResultByImageHash(imageHash);

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
	 * Gets the stored Result for a given image and Clarifai model, or undefined if it doesn't exist.
	 * @param image The image to find results for.
	 * @param clarifaiModel The Clarifai model to find results for.
	 */
	public getResult(image: JQuery, clarifaiModel: ClarifaiModel): Result
	{
		const imageHash      = this._generateImageHash(image);
		const existingResult = this._getResultByImageHash(imageHash);

		return existingResult && existingResult.getResultForModel(clarifaiModel) ? existingResult : undefined;
	}

	/**
	 * Gets the stared Result for a given image hash, or undefined if none exists.
	 * @param imageHash The image hash to search the results for.
	 */
	private _getResultByImageHash(imageHash: string): Result
	{
		// See if we already have the images results.
		return this._results.filter((result: Result): boolean =>
		{
			return result.imageHash === imageHash;
		})[0];
	}

	/**
	 * Generates the unique image hash for a given image element.
	 * @param image The image to generate the hash for.
	 * @returns The images unique hash.
	 */
	private _generateImageHash(image: JQuery): string
	{
		return md5(image.attr("src"));
	}
}

import * as $ from "jquery";
import * as md5 from "md5";

import { ClarifaiModel } from "../messages/Settings";

/** A single Clarifai model and result pair. */
interface StorageModelResult { [clarifaiModel: number]: string };

/** A collection of Clarifai model results keyed on the image hash. */
interface StorageResult { [imageHash: string]: string }

/** Stores Clarifai results for a given image. */
export class Results
{
	/**
	 * Creates or updates the results for a given image and Clarifai model.
	 * @param image The image to create or update results for.
	 * @param clarifaiModel The Clarifai model to set the image results on.
	 * @param clarifaiResults The Clarifai results for the image and model.
	 */
	public createOrUpdate(image: JQuery, clarifaiModel: ClarifaiModel, clarifaiResults: any): void
	{
		//TODO: We should transform the clarifai results into a nicely typed, better formed, and substantially smaller object before this point.

		const imageHash = this._generateImageHash(image);

		chrome.storage.local.get(imageHash, (items: StorageResult) =>
		{
			let storedModelResult: StorageModelResult = {};
			let storedResult: StorageResult           = {};

			// If we have previously stored some data for this image, get it now.
			if (Object.keys(items).length !== 0)
			{
				storedModelResult = JSON.parse(items[imageHash]);
			}

			// Create the model/result pair and put it into the results collection.
			storedModelResult[clarifaiModel] = JSON.stringify(clarifaiResults);

			// Create the results collection keyed on the image hash.
			storedResult[imageHash] = JSON.stringify(storedModelResult);

			// Store the results collection.
			chrome.storage.local.set(storedResult);
		});
	}

	/**
	 * Gets the stored Result for a given image and Clarifai model, or undefined if it doesn't exist.
	 * @param image The image to find results for.
	 * @param clarifaiModel The Clarifai model to find results for.
	 * @returns
	 */
	public getResult(image: JQuery, clarifaiModel: ClarifaiModel): void
	{
		const imageHash = this._generateImageHash(image);

		//TODO Need to return stuff from the callback
		chrome.storage.local.get(imageHash, (items: StorageResult) =>
		{
			// If we have previously stored some data for this image, get it now.
			if (Object.keys(items).length !== 0)
			{
				// Return the results for the clarifai model, or undefined if we haven't got any results for the given model.
				return JSON.parse(JSON.parse(items[imageHash])[clarifaiModel]) || undefined;
			}

			// Nothing stored for this image.
			return undefined;
		});

		return undefined;
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

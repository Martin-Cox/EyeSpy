import * as $ from "jquery";

import { CLIENT_ID, CLIENT_SECRET } from "./Keys";

// TODO: Get Clarifai to be webpack compatible.
const Clarifai = require("clarifai");

/**
 * The PageProcessor class. Handles logic for processing page DOM elements.
 */
export class PageProcessor
{
	/** The jQuery image elements on the page. */
	private _imageElements: JQuery;

	// TODO: When Clarifai is webpack compatible, the clarifai instance should be moved to EyeSpyController.
	/** The Clarifai app instance. */
	private _clarifai: any;

	public constructor()
	{
		this._clarifai = new Clarifai.App(CLIENT_ID, CLIENT_SECRET);
	}

	/**
	 * Processes a page.
	 */
	public processPage(): void
	{
		this._getPageImages();
	}

	/**
	 * Replaces a given image element with a new one.
	 * @param {type} imageElement The JQuery image element to replace.
	 * @param {type} replacementImage The JQuery image element to replace the existing one with.
	 */
	public replaceImage(imageElement: JQuery, replacementImage: JQuery): void
	{
		throw new Error("Not Implemented");
	}

	/**
	 * Gets all image elements on a page.
	 */
	private _getPageImages(): void
	{
		this._imageElements = $("body").find("img");

		// Test clarifai on the first available image.
		const firstImageSource = this._imageElements.first().attr("src");

		if (firstImageSource)
		{
			this._clarifai.models.predict(Clarifai.GENERAL_MODEL, firstImageSource).then(
				(response: any) =>
				{
					const imageConcepts: any[] = response.outputs[0].data.concepts;

					imageConcepts.forEach((concept: any) =>
					{
						console.log("Name: " + concept.name);
						console.log("Probability: " + concept.value * 100 + "%");
					});
				},
				(error: any) =>
				{
					console.error(error);
				}
			);
		}
	}
}

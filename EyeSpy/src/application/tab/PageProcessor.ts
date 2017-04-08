import * as $ from "jquery";

import { CLIENT_ID, CLIENT_SECRET } from "../Keys";

// TODO: Get Clarifai to be webpack compatible.
const clarifai = require("clarifai");

/**
 * The PageProcessor class. Handles logic for processing page DOM elements.
 */
export class PageProcessor
{
	/** The jQuery image elements on the page. */
	private _imageElements: JQuery;

	/** The Clarifai app instance. */
	private _clarifai: any;

	public constructor()
	{
		this._clarifai = new clarifai.App(CLIENT_ID, CLIENT_SECRET);
	}

	/**
	 * Analyses a page.
	 */
	public analysePage(): void
	{
		this._getPageImages();
	}

	/**
	 * Analyses a single image.
	 * @param image The image source or JQuery element to analyse.
	 */
	public analyseImage(image: string | JQuery): void
	{
		// Get the url of the image.
		const url = (typeof (image) === "string") ? image : image.attr("src");

		this._predictImage(url);
	}

	/**
	 * Replaces a given image element with a new one.
	 * @param imageElement The JQuery image element to replace.
	 * @param replacementImage The JQuery image element to replace the existing one with.
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
			this._predictImage(firstImageSource);
		}
	}

	/*
	 * Predicts the contents of a single image.
	 * @param url The source of the image to predict.
	 */
	private _predictImage(url: string): void
	{
		this._clarifai.models.predict(clarifai.GENERAL_MODEL, url).then(
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

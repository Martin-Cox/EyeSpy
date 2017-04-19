import * as $ from "jquery";

import { ClarifaiModel, IClarifaiSettings } from "../messages/Settings";

// TODO: Get Clarifai to be webpack compatible.
const clarifai = require("clarifai");

/**
 * The PageProcessor class. Handles logic for processing page DOM elements.
 */
export class PageProcessor
{
	/** The JQuery image elements on the page. */
	private _imageElements: JQuery;

	/** The JQuery element that was target by a mouse event. */
	private _mouseTargetElement: JQuery;

	/** The Clarifai app instance. */
	private _clarifai: any;

	/** The Clarifai API settings for this EyeSpy extension instance. */
	private _clarifaiSettings: IClarifaiSettings;

	/** The id of the Clarifai model chosen by the user. */
	private _clarifaiModelId: string;

	public constructor()
	{
		// Listen to right click mousedown events on the page and update the targetElement.
		$("body").mousedown((event: JQueryMouseEventObject) =>
		{
			if (event.button === 2)
			{
				this._mouseTargetElement = $(event.target);
			}
		});

		// Build the page image elements index.
		this._buildImagesIndex();
	}

	/**
	 * Updates the Clarifai API settings and re-initialises the Clarifai instance.
	 * @param settings The new API settings.
	 */
	public updateClarifaiSettings(settings: IClarifaiSettings): void
	{
		this._clarifaiSettings = settings;
		this._clarifaiModelId  = this._updateClarifaiModelId();
		this._clarifai         = new clarifai.App(settings.clientId, settings.clientSecret);
	}

	/**
	 * Analyses a page.
	 */
	public analysePage(): void
	{
		this._imageElements.each((index: number, image: Element) =>
		{
			// TODO: Bulk predict images in batches of up to 100.
		});
	}

	/**
	 * Analyses a single image.
	 * @param image The image source or JQuery element to analyse.
	 */
	public analyseImage(image: string | JQuery): void
	{
		let url: string;

		// Get the url of the image.
		url = (typeof (image) === "string") ? image : image.attr("src");

		// TODO: If we pass in image as a JQuery element we should pass that through here instead of the _mouseTargetElement
		this._predictImage(url, this._mouseTargetElement);
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
	 * Gets all image elements on a page and stores them in the _imageElements variable.
	 */
	private _buildImagesIndex(): void
	{
		this._imageElements = $("body").find("img");
	}

	/*
	 * Predicts the contents of a single image.
	 * @param url The source of the image to predict.
	 */
	private _predictImage(url: string, image?: JQuery): void
	{
		this._clarifai.models.predict(this._clarifaiModelId, url).then(
			(response: any) =>
			{
				if (image)
				{
					this._displayContentsTooltip(image, response.outputs[0].data.concepts);
				}
				else
				{
					// There is no image element we can use to display the concepts on, just log them to the console instead.
					const imageConcepts: any[] = response.outputs[0].data.concepts;

					console.group("Image Contents");

					imageConcepts.forEach((concept: any) =>
					{
						console.log("Name: " + concept.name);
						console.log("Probability: " + (concept.value * 100).toFixed(2) + "%");
					});

					console.groupEnd();
				}

			},
			(error: any) =>
			{
				console.error(error);
			}
		);
	}

	/**
	 * Display image contents as a tooltip.
	 * @param image The JQuery image element to display the concepts for.
	 * @param concepts The concepts to display.
	 */
	private _displayContentsTooltip(image: JQuery, concepts: [any]): void
	{
		const topConcepts    = concepts.slice(0, 5);
		const toolTip        = $("<div class=\"eyespy-image-contents-tooltip\">Image Contents:</div>");
		const toolTipWrapper = $("<div class=\"eyespy-tooltip-target\"></div>");

		// Build the tooltip contents.
		topConcepts.forEach((concept: any) =>
		{
			const contentElement = $("<div class=\"eyespy-image-contents\"><p>" + concept.name
				+ " " + (concept.value * 100).toFixed(2) + "%</p></div>");

			toolTip.append(contentElement);
		});

		// Wrap the image in the tooltip wrapper and add the tooltip as a child of the wrapper.
		image.wrap(toolTipWrapper);

		// To get the tooltip wrapper, we have to get the parent of the element we just wrapped, because jQuery wrap()
		// wraps a copy of the wrapper element around the target, so toolTipWrapper doesn't actually exist in the DOM.
		image.parent().append(toolTip);
	}

	/**
	 * Maps the IClarifaiSettings model value to the Clarifai models id.
	 * @returns The string containing the Clarifai models id.
	 */
	private _updateClarifaiModelId(): string
	{
		const cunt = this._clarifaiSettings.model as ClarifaiModel;

		switch (this._clarifaiSettings.model as ClarifaiModel)
		{
			case ClarifaiModel.Apparel:
				return "e0be3b9d6a454f0493ac3a30784001ff";
			case ClarifaiModel.Celebrity:
				return "e466caa0619f444ab97497640cefc4dc";
			case ClarifaiModel.Color:
				return "eeed0b6733a644cea07cf4c60f87ebb7";
			case ClarifaiModel.Face:
				return "a403429f2ddf4b49b307e318f00e528b";
			case ClarifaiModel.Focus:
				return "c2cf7cecd8a6427da375b9f35fcd2381";
			case ClarifaiModel.Food:
				return "bd367be194cf45149e75f01d59f77ba7";
			case ClarifaiModel.General:
				return "aaa03c23b3724a16a56b629203edc62c";
			case ClarifaiModel.NSFW:
				return "e9576d86d2004ed1a38ba0cf39ecb4b1";
		}
	}
}

// TODO: Instead of passing in an image element to _predictImage and letting that decide if it is suitable to
// _displayImageConcepts, _predictImage should return a promise so that whatever called it can decide how to react.

// TODO: Need to build a dictionary of _imageElements and their Clarifai results to prevent multiple requests being mad
// for the same image

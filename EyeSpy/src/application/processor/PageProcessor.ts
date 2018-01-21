import * as $ from "jquery";

import { ClarifaiModel, IClarifaiSettings } from "../messages/Settings";
import { Results } from "../processor/Results";

import {DownloadAction} from "../rules/DownloadAction";

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

	/** The results for this page. */
	private _results: Results = new Results();

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
		if (settings)
		{
			this._clarifaiSettings = settings;
			this._clarifaiModelId  = this._updateClarifaiModelId();
			this._clarifai         = new clarifai.App(settings.clientId, settings.clientSecret);
		}
		else
		{
			console.error("The Clarifai settings are invalid.");
		}
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
	 * Analyses a single image. If the image has been previously analysed, then it returns the cached results.
	 * @param target The image URL or JQuery element to analyse.
	 */
	public analyseImage(target: string | JQuery): void
	{
		let url: string;
		let image: JQuery;

		// Get the url of the image.
		url = (typeof (target) === "string") ? target : target.attr("src");

		// Get the actual image JQuery element. If it was passed through then we can use that, otherwise it will
		// be the current mouse target.
		image = (typeof (target) !== "string") ? target : this._mouseTargetElement;

		// If we haven't already got results for the given image/model combination, then get them now.
		if (!this._results.getResult(image, this._clarifaiSettings.model))
		{
			this._predictImage(url, this._mouseTargetElement);
		}
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

					this._results.createOrUpdate(image, this._clarifaiSettings.model, response);
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
		const topConcepts = concepts.slice(0, 5);
		const toolTip     = $("<div class=\"eyespy-image-contents-tooltip\">Image Contents:</div>");

		// Build the tooltip contents.
		topConcepts.forEach((concept: any) =>
		{
			const contentElement = $("<div class=\"eyespy-image-contents\"><p>" + concept.name
				+ " " + (concept.value * 100).toFixed(2) + "%</p></div>");

			toolTip.append(contentElement);
		});

		$("body").append(toolTip);

		image.hover((event: JQueryEventObject) =>
		{
			if (event.type === "mouseleave")
			{
				toolTip.toggleClass("eyespy-hidden", true);
				return;
			}

			toolTip.outerWidth(image.width());
			toolTip.css("left", image.offset().left);
			toolTip.css("top", image.offset().top + image.height());

			toolTip.toggleClass("eyespy-hidden", false);
		});
	}

	/**
	 * Maps the IClarifaiSettings model value to the Clarifai models id.
	 * @returns The string containing the Clarifai models id.
	 */
	private _updateClarifaiModelId(): string
	{
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

// TODO: Add decorator for any method that attemps to use clarifai that validates the clarifai settings.

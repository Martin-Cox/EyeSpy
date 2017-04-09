import * as $ from "jquery";

import { CLIENT_ID, CLIENT_SECRET } from "../Keys";

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

	public constructor()
	{
		this._clarifai = new clarifai.App(CLIENT_ID, CLIENT_SECRET);

		// Listen to right click mousedown events on the page and update the targetElement.
		$("body").mousedown((event: JQueryMouseEventObject) =>
		{
			if (event.button === 2)
			{
				this._mouseTargetElement = $(event.target);
			}
		});
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
	private _predictImage(url: string, image?: JQuery): void
	{
		this._clarifai.models.predict(clarifai.GENERAL_MODEL, url).then(
			(response: any) =>
			{
				if (image)
				{
					this._displayImageConcepts(image, response.outputs[0].data.concepts);
				}
				else
				{
					// There is no image element we can use to display the concepts on, just log them to the console instead.
					const imageConcepts: any[] = response.outputs[0].data.concepts;

					imageConcepts.forEach((concept: any) =>
					{
						console.log("Name: " + concept.name);
						console.log("Probability: " + (concept.value * 100).toFixed(2) + "%");
					});
				}

			},
			(error: any) =>
			{
				console.error(error);
			}
		);
	}

	/**
	 * Display image concepts on the page.
	 * @param image The JQuery image element to display the concepts for.
	 * @param concepts The concepts to display.
	 */
	private _displayImageConcepts(image: JQuery, concepts: [any]): void
	{
		const topConcepts     = concepts.slice(0, 5);
		const conceptsWrapper = $("<div class=\"eyespy-image-concepts-wrapper\">Image Contents:</div>");

		topConcepts.forEach((concept: any) =>
		{
			const conceptElement = $("<div class=\"eyespy-image-concept\"><p>" + concept.name
				+ " " + (concept.value * 100).toFixed(2) + "%</p></div>");

			conceptsWrapper.append(conceptElement);
		});

		const belowImageX = image.offset().left;
		const belowImageY = image.offset().top + image.innerHeight();

		$("body").append(conceptsWrapper);

		// TODO: Shouldn't be defining the popup styles here :/
		conceptsWrapper.css({
			left: belowImageX, top: belowImageY, position: "absolute", backgroundColor: "#F4F4F4", width: image.width(),
			textAlign: "center", fontSize: "1.275em", color: "black"
		}).fadeIn(1000);

		console.log(conceptsWrapper);
	}
}

// TODO: Instead of passing in an image element to _predictImage and letting that decide if it is suitable to
// _displayImageConcepts, _predictImage should return a promise so that whatever called it can decide how to react.

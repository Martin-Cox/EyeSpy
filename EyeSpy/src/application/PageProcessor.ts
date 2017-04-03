import * as $ from "jquery";

/**
 * The PageProcessor class. Handles logic for processing page DOM elements.
 */
export class PageProcessor
{
	/** The array of jQuery image elements. */
	private _imageElement: JQuery[];

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
		console.log("Page scan results:");
		console.log($("body").find("img"));
	}
}

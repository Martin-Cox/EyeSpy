import { ClarifaiModel } from "../messages/Settings";

/** Interface for a model/result dictionary. */
interface IModelResult
{
	[model: number]: any;
}

/** Stores Clarifai results for a given image. */
export class Result
{
	/** The unique hash for the image. */
	private _imageHash: string;

	/** The dictionary for storing a Clarifai Model and its results. */
	private _modelResults: IModelResult[];

	/**
	 * Creates a new instance of the Result class.
	 * @param imageHash The hash of the image to store results for.
	 */
	public constructor(imageHash: string)
	{
		this._imageHash = imageHash;
	}

	/** Gets the images hash. */
	public get imageHash(): string
	{
		return this._imageHash;
	}

	/**
	 * Gets the Clarifai results for a given Clarifai model.
	 * @param model The Clarifai model to get this images results for.
	 * @returns This images Clarifai results for the given Clarifai model.
	 */
	public getResultForModel(model: ClarifaiModel): any
	{
		return this._modelResults[model as number];
	}

	/**
	 * Sets the Clarifai results for a given Clarifai model.
	 * @param model The Clarifai model to set the image results for.
	 * @param result The Clarifai results for this image.
	 */
	public setResultForModel(model: ClarifaiModel, result: any): void
	{
		this._modelResults[model as number] = result;
	}
}

// TODO: Clarifai results should be typed.

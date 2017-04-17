export enum ClarifaiModel
{
	Apparel,
	Celebrity,
	Color,
	Face,
	Focus,
	Food,
	General,
	NSFW
}

/** Interface describing the Clarifai API settings. */
export interface IClarifaiSettings
{
	clientId: string;
	clientSecret: string;
	model: ClarifaiModel;
}

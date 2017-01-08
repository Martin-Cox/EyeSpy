class EyeSpy {

	// The instance of the EyeSpy extension.
	private static _eyeSpy: EyeSpy;

	public constructor() 
	{
		console.log("EyeSpy initial creation");
	}

	/**
	 * Creates the singleton instance of the EyeSpy extension.
	 */
	public static createInstance(): EyeSpy 
	{
		if (this._eyeSpy)
		{
			return this._eyeSpy;
		}
		else
		{
			return new EyeSpy();
		}
	}

	//TODO: Only one instance of the extension should ever be created for a single chrome window -> https://stackoverflow.com/questions/31799903/persist-a-page-actions-state-in-a-chrome-extension
	//TODO: Detect page change and log a page change message to the console.

}
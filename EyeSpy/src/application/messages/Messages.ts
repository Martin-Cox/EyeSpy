/** Interface describing content script messages. */
export interface IMessage
{
	action: MessageActions;
	url?: string;
}

export enum MessageActions {
	PageLoad,
	ScanPage,
	AnalyseImage,
	ClarifaiSettingsChanged,
	Download
}

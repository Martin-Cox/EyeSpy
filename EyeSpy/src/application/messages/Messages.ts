export interface IMessage {
	action: MessageActions;
	url?: string;
}

export enum MessageActions {
	TabLoad,
	ScanPage,
	AnalyseImage,
	CredentialsUpdated
}

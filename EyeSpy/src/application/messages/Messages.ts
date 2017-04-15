export interface IMessage {
	action: MessageActions;
	url?: string;
}

export enum MessageActions {
	PageLoad,
	ScanPage,
	AnalyseImage,
	CredentialsUpdated
}

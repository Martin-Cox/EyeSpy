import * as $ from "jquery";

import { MessageActions } from "../messages/Messages";
import { IClarifaiSettings } from "../messages/Settings";

/** JavaScript to be ran on the extension's popup page. */

/** Add the document ready handler. */
$("document").ready(() =>
{
	populateSettingsForm();
});

/** Add the scan page button click handler. */
$("#scan-page-button").click(() =>
{
	sendMessage(MessageActions.ScanPage);
});

/** Add the save Clarifai API settings handler. */
$("#save-clarifai-settings").click(() =>
{
	const clarifaiSettings: IClarifaiSettings = {
		clientId: $("#clarifai-client-id").val(),
		clientSecret: $("#clarifai-client-secret").val(),
		model: parseInt($("#clarifai-model").val(), 10)
	};

	// Store the Clarifai API settings in the local storage.
	chrome.storage.sync.set({ clarifaiSettings }, () => sendMessage(MessageActions.ClarifaiSettingsChanged));
});

$(".menu-item.home").click(() =>
{
	resetMenuState();
	activateMenuItem(".home");
});

$(".menu-item.rules").click(() =>
{
	resetMenuState();
	activateMenuItem(".rules");
});

$(".menu-item.settings").click(() =>
{
	resetMenuState();
	activateMenuItem(".settings");
});

/**
 * Sends a message to the content script in the current tab.
 * @param action The MessageAction action to send in the message.
 * @param url The optional url to include in the mesage.
 */
function sendMessage(action: MessageActions, url?: string): void
{
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs: chrome.tabs.Tab[]) =>
	{
		chrome.tabs.sendMessage(tabs[0].id, { action, url });
	});
}

/**
 * Activates a menu button and it's corresponding panel content view.
 * @param menuSectionName The name of the menu button and panel content view to activate.
 */
function activateMenuItem(menuSectionName: string): void
{
	$(".menu-item" + menuSectionName).addClass("active");
	$(".panel-content" + menuSectionName).removeClass("eyespy-hidden");
}

/**
 * Resets the state of the menu by hiding and deactivating all menu buttons and panel content views.
 */
function resetMenuState(): void
{
	$(".menu-item").removeClass("active");
	$(".panel-content").addClass("eyespy-hidden");
}

/**
 * Populates the settings form.
 */
function populateSettingsForm(): void
{
	// TODO: A procedure for keeping form details in sync between this script and the EyeSpyController would be a much
	// better way of handling this. The controller could pass the updated values which the form then updates on the
	// view and vice-versa.
	chrome.storage.sync.get("clarifaiSettings", (response: any) =>
	{
		const clarifaiSettings: IClarifaiSettings = response.clarifaiSettings;

		$("#clarifai-client-id").val(clarifaiSettings.clientId);
		$("#clarifai-client-secret").val(clarifaiSettings.clientSecret);
		$("#clarifai-model").val(clarifaiSettings.model);
	});
}

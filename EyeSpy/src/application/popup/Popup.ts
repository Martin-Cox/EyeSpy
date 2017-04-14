import * as $ from "jquery";

import { MessageActions } from "../messages/Messages";

/** JavaScript to be ran on the extension's popup page. */

/** Add the scan page button click handler. */
$("#scan-page-button").click(() =>
{
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs: chrome.tabs.Tab[]) =>
	{
		chrome.tabs.sendMessage(tabs[0].id, { action: MessageActions.ScanPage });
	});
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

function activateMenuItem(menuSectionName: string): void
{
	$(".menu-item" + menuSectionName).addClass("active");
	$(".panel-content" + menuSectionName).removeClass("hidden");
}

/**
 * Resets the state of the menu by hiding and deactivating all menu buttons and panel content views.
 */
function resetMenuState(): void
{
	$(".menu-item").removeClass("active");
	$(".panel-content").addClass("hidden");
}
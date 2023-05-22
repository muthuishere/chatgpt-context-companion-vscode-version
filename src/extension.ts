// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as promptcontainer from './components/showPromptsContainer';
import { join } from 'path';
import {  createWebViewPanel, deactivatePanel } from './panels/responsepanel';
import { setSecretStore } from './services/configStoreService';
import { getChatGptResponseCommand } from './components/chatGptResponseContainer';
import { getApiKeyContainer, getRemoveApiKeyContainer } from './components/apiKeyInputContainer';
import { getMaxTokenInputContainer } from './components/maxtokenInputContainer';
import { getModelInputContainer } from './components/modelInputContainer';
import { getRemovePromptContainer,getAddPromptContainer, getResetPromptContainer } from './components/promptmanageContainer';



// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {


	let menudisposable = promptcontainer.getQuickMenu();
	const loadingHtmlPath = join(context.extensionPath, 'src', 'panels', 'panel.html');
	 
	const panel =  createWebViewPanel(loadingHtmlPath);

	setSecretStore(context.secrets);

	const chatgptResponseCommand =getChatGptResponseCommand();

	context.subscriptions.push(menudisposable);
	context.subscriptions.push(chatgptResponseCommand);
	context.subscriptions.push(panel);
	context.subscriptions.push(getApiKeyContainer());
	context.subscriptions.push(getMaxTokenInputContainer());
	context.subscriptions.push(getModelInputContainer());
	context.subscriptions.push(getRemoveApiKeyContainer());
	context.subscriptions.push(getRemovePromptContainer());
	context.subscriptions.push(getAddPromptContainer());
	context.subscriptions.push(getResetPromptContainer());
    

}

// This method is called when your extension is deactivated
export function deactivate() {

	deactivatePanel();
}

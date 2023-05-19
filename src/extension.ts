// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as promptcontainer from './components/quickMenuContainer';
import { join } from 'path';
import {  createWebViewPanel, deactivatePanel } from './panels/responsepanel';
import { updateSecretStore } from './services/apiKeyService';
import { getChatGptResponseCommand } from './components/chatGptResponseCmdContainer';
import { getApiKeyContainer } from './components/apiKeyInputContainer';



// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {


	let menudisposable = promptcontainer.getQuickMenu();
	const loadingHtmlPath = join(context.extensionPath, 'src', 'panels', 'panel.html');
	 
	const panel =  createWebViewPanel(loadingHtmlPath);

	updateSecretStore(context.secrets);

	const chatgptResponseCommand =getChatGptResponseCommand();

	context.subscriptions.push(menudisposable);
	context.subscriptions.push(chatgptResponseCommand);
	context.subscriptions.push(panel);
	context.subscriptions.push(getApiKeyContainer());
    

}

// This method is called when your extension is deactivated
export function deactivate() {

	deactivatePanel();
}

import * as vscode from 'vscode';
import * as chatgptapi from '../services/chatgptapi';
import { showError, showPanel, showResponse, updateFullContent, updatePartialContent, updateQuestion } from '../panels/responsepanel';
import { getApiKey } from './apiKeyInputContainer';
import { getApiUrlFromStorage, getMaxTokensFromStorage, getModelFromStorage } from '../services/configStoreService';


export function getChatGptResponseCommand(){
	return vscode.commands.registerCommand('chatgptcontextcompanion.executeChatGptResponse', async (item) => {

		let apiKey = await getApiKey();
		const model =await getModelFromStorage();
		const apiUrl =await getApiUrlFromStorage();
		const maxTokens =await getMaxTokensFromStorage();
		if(!apiKey ){
			vscode.window.showInformationMessage("Please set your API Key");		
			return;
			}

		if(!model || !apiUrl || !maxTokens){
			vscode.window.showInformationMessage("Please update settings  Model, API URL and Max Tokens in the settings");		
			return;
			}



		await getChatGptResponseFor(item,{model,apiUrl,apiKey,maxTokens});

		 
	});

}
async function getChatGptResponseFor(item: any,input:any) {


	try {
		


	const{model,apiUrl,apiKey,maxTokens} = input;
	// console.log("getChatGptResponseFor input",input);
	showPanel();
	
	const options = {
		"apiUrl": apiUrl,
		"model": model,
		"apiKey": apiKey,
		// eslint-disable-next-line @typescript-eslint/naming-convention
		"max_tokens": maxTokens,
	};
	const question = item.value;
	updateQuestion(question);
	let finalResponse = "";
	await chatgptapi.sendChatGPTRequest(question, options, (input: any) => {
		const { content, done, error } = input;
		if (error) {
			showError(error);
		} else {
			finalResponse += content;

			if(done){
				updateFullContent(question, finalResponse);
			}else{
				updatePartialContent(question, finalResponse);
			}
			
		}

	});
} catch (error:any) {
	showError("Error: Unable to get response " +error.message);
}
}

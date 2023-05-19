import * as vscode from 'vscode';
import * as chatgptapi from '../services/chatgptapi';
import { showError, showPanel, showResponse, updateFullContent, updatePartialContent, updateQuestion } from '../panels/responsepanel';
import { getApiKey } from './apiKeyInputContainer';


export function getChatGptResponseCommand(){
	return vscode.commands.registerCommand('chatgptcontextcompanion.executeChatGptResponse', async (item) => {
		console.log("chatgptcontextcompanion.executeChatGptResponse",item);


		let apiKey = await getApiKey();
		if(!apiKey){
			console.log("No API Key");
				return;
			}


		await getChatGptResponseFor(item,apiKey);

		 
	});

}
async function getChatGptResponseFor(item: any,apiKey: string) {
	showPanel();
	//vscode.window.showInformationMessage(`${item.label}: ${item.value}`);
	// const options = {
	// 	"apiUrl": "https://api.openai.com/v1/chat/completions",
	// 	"model": "gpt-3.5-turbo",
	// 	"apiKey": "",
	// 	// eslint-disable-next-line @typescript-eslint/naming-convention
	// 	"max_tokens": 500,
	// };
	
	const options = {
		"apiUrl": "https://api.openai.com/v1/chat/completions",
		"model": "gpt-3.5-turbo",
		"apiKey": apiKey,
		// eslint-disable-next-line @typescript-eslint/naming-convention
		"max_tokens": 500,
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
}

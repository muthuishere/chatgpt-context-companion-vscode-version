import { getApiKeyFromStorage, removeApiKeyToStorage, saveApiKeyToStorage } from "../services/configStoreService";
import * as vscode from 'vscode';


export function getApiKeyContainer(){
    return vscode.commands.registerCommand('chatgptcontextcompanion.setApiKey', async () => {		
       let apiKey = await getApiKeyFromUser();
        await saveApiKeyToStorage(apiKey);
	});
    
}

export function getRemoveApiKeyContainer(){
    return vscode.commands.registerCommand('chatgptcontextcompanion.removeApiKey', async () => {		       
        await removeApiKeyToStorage();
	});
    
}

export async function getApiKeyFromUser(){

    const apiKey = await vscode.window.showInputBox({
        prompt: 'Enter OpenAI API key',        
        ignoreFocusOut: true, // This keeps the input box open when it loses focus
    });



    // Abort if the user didn't enter an API key
    if (!apiKey) {
        vscode.window.showErrorMessage('No API key provided');
        return;
    }


    return apiKey;
}


export async function getApiKey(){

    let apiKey = await getApiKeyFromStorage();

 


		if(!apiKey){
            
            apiKey = await getApiKeyFromUser();
            
            await saveApiKeyToStorage(apiKey);
          
				
		}
    return apiKey;
}

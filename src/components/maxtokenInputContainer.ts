import { getMaxTokensFromStorage, setMaxTokenstoStorage } from "../services/configStoreService";
import * as vscode from 'vscode';


export function getMaxTokenInputContainer(){
    return vscode.commands.registerCommand('chatgptcontextcompanion.setMaxTokens', async () => {		
       
        try{
        let maxTokenInput = await getMaxTokenInputFromUser();
        await setMaxTokenstoStorage(maxTokenInput);
    } catch (error) {
        console.log("Error getting maxToken input",error);
        return;
    }
       
     
	});
    
}

export async function getMaxTokenInputFromUser(){

    return new Promise(async (resolve,reject)=>{
    

        const maxTokens = await vscode.window.showInputBox({
            prompt: 'Enter Max Tokens to use',        
            ignoreFocusOut: true, // This keeps the input box open when it loses focus
        });
    
    
    
        // Abort if the user didn't enter an API key
        if (!maxTokens) {
            reject("No maxToken provided");
            return;
        }
    
    
        resolve(maxTokens);


});



}


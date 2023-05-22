/* eslint-disable @typescript-eslint/naming-convention */
import { getModelFromStorage, saveModelToStorage } from "../services/configStoreService";
import * as vscode from 'vscode';


export function getModelInputContainer(){
    return vscode.commands.registerCommand('chatgptcontextcompanion.setGptModel', async () => {		
       
        try{
        let modelInput = await getModelInputFromUser();
        await saveModelToStorage(modelInput);
    } catch (error) {
        console.log("Error getting model input",error);
        return;
    }
       
     
	});
    
}

export async function getModelInputFromUser(){

    return new Promise((resolve,reject)=>{
    

    const rules:any ={

        "GPT 3.5":{
            "apiUrl": "https://api.openai.com/v1/chat/completions",
		    "model": "gpt-3.5-turbo",
        },
        "GPT 4":{
            "apiUrl": "https://api.openai.com/v1/chat/completions",
		    "model": "gpt-4",
        },
        "GPT 4(32K)":{
            "apiUrl": "https://api.openai.com/v1/chat/completions",
		    "model": "gpt-4-32k",
        }

    };

    const quickPick = vscode.window.createQuickPick();
    quickPick.items = Object.keys(rules).map((key) => {
        return {label: key};
    });

    quickPick.onDidChangeSelection(([item]) => {
        if (item && item.label ) {
            const {apiUrl,model} = rules[item.label];
            resolve({label:item.label,apiUrl,model});
        }else{
            reject("No model selected");
        }
        quickPick.hide();
    });
    quickPick.onDidHide(() => quickPick.dispose());
    quickPick.show();
});



}


import * as vscode from 'vscode';

let vsCodeSecretRepo:any;
export function setSecretStore(secrets:any){
    vsCodeSecretRepo=secrets;

}


export async function getApiKeyFromStorage(){
    const apiKey = await vsCodeSecretRepo.get('chatgptcontextcompanion.apiKey'); 
    return apiKey;
}
export async function saveApiKeyToStorage(apiKey: string | undefined) {
    if(apiKey){
    await vsCodeSecretRepo.store('chatgptcontextcompanion.apiKey', apiKey);

    vscode.window.showInformationMessage('API Key saved!');
    }
}
export async function removeApiKeyToStorage() {
    
    await vsCodeSecretRepo.delete('chatgptcontextcompanion.apiKey');
    
}

export async function getModelFromStorage(){
    const modelname = vscode.workspace.getConfiguration().get('chatgptcontextcompanion.model');
         
    return modelname;
}
export async function getApiUrlFromStorage(){
    const apiUrl = vscode.workspace.getConfiguration().get('chatgptcontextcompanion.apiUrl');
         
    return apiUrl;
}
export async function getMaxTokensFromStorage() {
    const maxTokens = await vscode.workspace.getConfiguration().get('chatgptcontextcompanion.maxTokens');
         
    return maxTokens;
}
export async function saveModelToStorage(input: any | undefined) {
    if(input){

        const {label,apiUrl,model} = input;
        let config = vscode.workspace.getConfiguration('chatgptcontextcompanion');
        await config.update('model', model, vscode.ConfigurationTarget.Global);
        await config.update('apiUrl', apiUrl, vscode.ConfigurationTarget.Global);
    vscode.window.showInformationMessage('Model set to ' + label);
    }
}

export async function setMaxTokenstoStorage(maxTokens: any | undefined) {
    if(maxTokens){

        let config = vscode.workspace.getConfiguration('chatgptcontextcompanion');
        await config.update('maxTokens', maxTokens, vscode.ConfigurationTarget.Global);
   
    vscode.window.showInformationMessage('maxTokens updated!');
    }
}


export async function getPromptsFromStorage(){
    const prompts = vscode.workspace.getConfiguration().get('chatgptcontextcompanion.prompts') as {label: string, value: string}[];
    
    return prompts;
}

export async function removePromptFromStorage(selectedLabel:string | undefined) {
    if(selectedLabel){

        let prompts = await getPromptsFromStorage();
            // Filter out the selected prompt
            const newPrompts = prompts.filter(prompt => prompt.label !== selectedLabel);

            // Update the configuration
            await vscode.workspace.getConfiguration().update('chatgptcontextcompanion.prompts', newPrompts, vscode.ConfigurationTarget.Global);
        
    vscode.window.showInformationMessage('removed prompt!' +selectedLabel);
    }
}
export async function addPromptToStorage(label:string, value:string) {
    if(value){

        let prompts = await getPromptsFromStorage();
        prompts.push({label,value});
        await vscode.workspace.getConfiguration().update('chatgptcontextcompanion.prompts', prompts, vscode.ConfigurationTarget.Global);

    vscode.window.showInformationMessage('added prompt!' +label);
    }
}

export async function movePromptToTop(prompt:any) {
    let prompts = await getPromptsFromStorage();

    const promptIndex = prompts.findIndex((item:any) => item.label === prompt.label);
    if (promptIndex === 0) {
        return;
    }
    const promptToMove = prompts.splice(promptIndex, 1)[0];
    prompts.unshift(promptToMove);
    await vscode.workspace.getConfiguration().update('chatgptcontextcompanion.prompts', prompts, vscode.ConfigurationTarget.Global);

}
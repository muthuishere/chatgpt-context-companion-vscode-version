import * as vscode from 'vscode';

let vsCodeSecretRepo:any;
export function updateSecretStore(secrets:any){
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


import * as vscode from 'vscode';

import { readFile } from 'fs/promises';
import { Marked } from '@ts-stack/markdown';

let panel: vscode.WebviewPanel | undefined;


export function createWebViewPanel(loadingHtmlPath: string) {
    return vscode.commands.registerCommand('chatgptcontextcompanion.openMarkdownWindow', async () => {


        if (!panel) {
            panel = vscode.window.createWebviewPanel(
                'markdownWindow',
                'ChatGptContextCompanion Results',
                vscode.ViewColumn.Beside,
                {
                    enableScripts: true,
                    retainContextWhenHidden: true
                }
            );
            panel.onDidDispose(() => {
                // When the panel is disposed, set our reference to undefined
                panel = undefined;
            });

            // Read the loading HTML from a file

            const loadingHtml = await readFile(loadingHtmlPath, 'utf8');


            // Set initial loading HTML for the webview
            panel.webview.html = loadingHtml;



        }

    });



    // // Fetch markdown content from an API
    // const apiResponse = await fetch('https://api.example.com/markdown', {
    //     method: 'POST',
    //     headers: {
    //         'Authorization': 'Bearer your_token_here',
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         // Include any necessary data in the request body
    //     })
    // });
    // const markdownContent = await apiResponse.text();

    // // Convert the markdown content to HTML
    // const md = new MarkdownIt();
    // const htmlContent = md.render(markdownContent);

    // // Send the markdown HTML to the webview
    // panel.webview.postMessage({
    //     command: 'updateContent',
    //     content: htmlContent
    // });


}

export function showPanel() {
//execute command chatgptcontextcompanion.openMarkdownWindow
if(!panel){
    vscode.commands.executeCommand('chatgptcontextcompanion.openMarkdownWindow');
}else{
    panel?.reveal();
    panel?.webview.postMessage({
        command: 'showLoading'
    });
}
    


}

export function showResponse(question: string,response: string) {
 panel?.webview.postMessage({
        command: 'updateContent',
        question,
        content: response
    });
}
export function updatePartialContent(question: string,input: string) {

  const response=  Marked.parse(input);
 panel?.webview.postMessage({
        command: 'updatePartial',
        question,
        content: response
    });
}
export function updateFullContent(question: string,input: string) {
    const response=  Marked.parse(input);
 panel?.webview.postMessage({
        command: 'updateFull',
        markuptext: input,
        question,
        content: response
    });
}
export function updateQuestion(question: string) {
 panel?.webview.postMessage({
        command: 'updateQuestion',        
        content: question
    });
}
export function showError(response: string) {
// if response contains invalid_api_key

// remove api key from storage
if(response.includes("invalid_api_key")){
    vscode.commands.executeCommand('chatgptcontextcompanion.removeApiKey');
}
 panel?.webview.postMessage({
        command: 'showError',
        content: response
    });
}
export function deactivatePanel() {

    
        panel?.dispose();
    
}

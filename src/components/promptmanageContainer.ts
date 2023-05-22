import * as vscode from 'vscode';
import { addPromptToStorage, getPromptsFromStorage, removePromptFromStorage, resetPromptsInStorage } from '../services/configStoreService';


export function getRemovePromptContainer() {
    return vscode.commands.registerCommand('chatgptcontextcompanion.removePrompt', async () => {

        try {
            let prompts = await getPromptsFromStorage();
            const selectedLabel = await vscode.window.showQuickPick(prompts.map(prompt => prompt.label));

            await removePromptFromStorage(selectedLabel);
        } catch (error) {            
            handleError(error);
        }


    });
}


export function getResetPromptContainer() {
    return vscode.commands.registerCommand('chatgptcontextcompanion.resetPrompts', async () => {

        try {
           await resetPromptsInStorage();
          
        } catch (error) {            
            handleError(error);
        }


    });
}


function getFormattedPrompt(input: string) {
    // if (input.includes('%s') === false) {
    //     throw new Error("Invalid  input , It should not be empty and should contain %s");

    // }
    let prompt;
    
    if (input.includes('{') === false) {
        prompt = { label: input, value: input };
    } else if (input.includes('{')) {
        prompt = JSON.parse(input!);
    }

    const isValidPrompt = 'label' in prompt && 'value' in prompt;

    if (!isValidPrompt) {
        throw new Error("JSON object should contain both 'label' and 'value'");
    }
    return prompt;
}
    export function getAddPromptContainer() {



        return vscode.commands.registerCommand('chatgptcontextcompanion.addPrompt', async () => {

         
           

                const userJsonInput = await vscode.window.showInputBox({
                    prompt: 'Add a prompt use %s to replace selected text  ,',
                    placeHolder: 'a string or json {"label": "your label", "value": "your value"} ,'
                });

                if(!userJsonInput){
                    return;
                }

                try {
                // if userJsonInput is undefined throw error
              



                const prompt = getFormattedPrompt(userJsonInput);
                //prompts.push(newUserPrompt);
                await addPromptToStorage(prompt.label, prompt.value);


            } catch (error: any) {


                handleError(error);
             
            }


        });

    }


    function handleError(error:any){

        if ('message' in error) {
            vscode.window.showErrorMessage(error.message);
        } else {
            vscode.window.showErrorMessage(error.toString());
        }
    }
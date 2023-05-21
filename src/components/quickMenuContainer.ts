import * as vscode from 'vscode';
import { getPromptsFromStorage, movePromptToTop } from '../services/configStoreService';


function getFormattedText(rules: any,input: string){


	let result = input;
	//iterate over rules
	for(let i=0;i<rules.length;i++){
		const rule = rules[i];
		result = result.replace(rule.find,rule.replace);
	}



	return result;
}
export function getQuickMenu(){
    let menudisposable = vscode.commands.registerCommand('chatgptcontextcompanion.showOptions', () => {
		const quickPick = vscode.window.createQuickPick();
        const items:any = getPromptsFromStorage();;
        

		const selectedText = getSelectedText();

		const replacementRules =[
			{
				"find":"%s",
				"replace":selectedText
			}
		];
		quickPick.items = items.map((item: { label: any; value: any; }) => ({ label: getFormattedText(replacementRules,item.label), value: getFormattedText(replacementRules,item.value) }));
		
		quickPick.onDidChangeSelection(async (obj) => {
 
			const item:any = obj[0];
			if (item) {

				//execute command

				setTimeout(() => {
				
					vscode.commands.executeCommand('chatgptcontextcompanion.executeChatGptResponse',item);
				}, 100);
				quickPick.hide();
 
				movePromptToTop(item);

			
				
			}
		});
		
	
		quickPick.onDidHide(() => quickPick.dispose());
		quickPick.show();
	});
    return menudisposable;
}



function getSelectedText() {
	let editor = vscode.window.activeTextEditor;
				if (!editor) {
					return ""; // No open text editor
				}
	let selection = editor.selection;
	let text;
	if (selection.isEmpty) {
		// No text is selected, get the text of the entire line
		text = editor.document.lineAt(selection.start.line).text;
	} else {
		// Some text is selected, get the selected text
		text = editor.document.getText(selection);
	}
	return text;
}

function getActiveFileName(){
	// get active activeTextEditor file name
	let editor = vscode.window.activeTextEditor;
	if (!editor) {
		return ""; // No open text editor
	}
	let document = editor.document;
	return document.fileName;
}

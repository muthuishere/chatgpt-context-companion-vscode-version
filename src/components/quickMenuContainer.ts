import * as vscode from 'vscode';


function getFormattedText(selectedText: string,input: string){
	return input.replace("%s",selectedText);
}
export function getQuickMenu(){
    let menudisposable = vscode.commands.registerCommand('chatgptcontextcompanion.showOptions', () => {
		const quickPick = vscode.window.createQuickPick();
        const items:any = vscode.workspace.getConfiguration().get('chatgptcontextcompanion.prompts');
        

		const text = getSelectedText();

		quickPick.items = items.map((item: { label: any; value: any; }) => ({ label: getFormattedText(text,item.label), value: getFormattedText(text,item.value) }));
		
		quickPick.onDidChangeSelection(async (obj) => {
 
			const item:any = obj[0];
			if (item) {

				//execute command

				setTimeout(() => {
				
					vscode.commands.executeCommand('chatgptcontextcompanion.executeChatGptResponse',item);
				}, 100);
				quickPick.hide();
 

			
				
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

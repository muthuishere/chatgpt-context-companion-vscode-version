import * as assert from 'assert';
import exp = require('constants');

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { getPromptsFromStorage } from '../../services/configStoreService';

// import * as myExtension from '../../extension';
  
suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Prompt Movement Test', async () => {


		const prompts = await getPromptsFromStorage();
		console.log(prompts);
		assert.equal(prompts.length, 11);
		
		
	});
});


# ChatGpt Context Companion for Visual Studio Code

ChatGpt Context Companion is a VS Code extension that utilizes Open AI technology to enhance your development experience. This extension allows you to customize prompts from the context menu and get AI-generated responses, making your coding faster, smarter and more efficient.

## Pre-requisties

You might need an Open AI key from [here](https://platform.openai.com/account/api-keys) to use this extension.

## Features

* Customizable Prompts: Create and use your own prompts based on your unique coding style or requirements. 
* Quick Menu Integration: Easily access the ChatGpt Context Companion from Quick menu to get help with your coding (Ctrl + m in windows / Cmd + m in Mac ). 
* OpenAi Generated Answers: Get instant, intelligent responses from the OpenAI to help you code more effectively.
* Configurable Settings: Make the extension work for you by customizing and configuring it to suit your needs. You can set API Key , Choose Model through settings.


## Installation

1. Open **Extensions** sidebar panel in Visual Studio Code. `View → Extensions`.
2. Search for `ChatGpt Context Companion - Vscode`.
3. Click **Install** to install it.
4. Click **Reload** to reload the your editor.
5. Code away with the help of your new ChatGpt Context Companion!




## How to Use

- Type Ctrl M in windows or Cmd M in mac at end of line or selection to show up the prompts and choose the prompt you want to use and press  "Enter", and the AI will generate the response based on your command and display in a side panel.

- Type Ctrl + Shift + P  in windows / Cmd + Shift + P in Mac  for settings
- Type "ChatGpt Context Companion".
    - Choose "Set API Key" to set your API Key.    
    - Choose "Choose Model" to set your Model (Currently we support GPT 3.5 /GPT 4 / GPT 4 (32k)).
    - Choose "Set Max Tokens " to set the maximum tokens to use for the completion (default is 300).
    - Choose "Add Prompt" to add a prompt.
        - Prompt can be a string or a json.
        - use %s within prompt to get selected text within prompt.
        - Some Sample Prompts
            - <code>  What is the output of %s ? </code>

            - <code> {
              "label": "Explain %s",
              "value": "Explain the following code to junior developer :  %s "
            }</code>

    - Choose "Remove Prompt" to  remove prompt







## Feedback

If you have suggestions or issues, please [file an issue](https://www.reddit.com/r/writeassistchatgpt/).


## License
[MIT](https://choosealicense.com/licenses/mit/)

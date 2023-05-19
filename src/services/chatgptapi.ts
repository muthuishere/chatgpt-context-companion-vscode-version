/* eslint-disable @typescript-eslint/naming-convention */

// const vscode = require('vscode');

import fetch from 'node-fetch';
import { TextDecoder } from 'node:util';

function getAsLines(value: any) {

    let data = "";
    // check value is uint8array
    if ((value instanceof Uint8Array)) {
         data = new TextDecoder("utf-8").decode(value);
    }else {
        data = value;
    }

    return data.split("\n")
        .map((i) => i.trim())
        .filter((i) => i.length > 0)
        .map((i) => i.replace("data: ", ""));
}
function isJson(value:any) {
    try {
        JSON.parse(value);
    } catch (ex) {
        return false;
    }
    return true;


}

function getAsJson(value: string) {

    let data:any = {};
    try {

        data = JSON.parse(value);

        const content = data.choices
                            .map((i: { delta: any; }) => i.delta)
                            .filter((i: any) => i.hasOwnProperty("content"))
                            .map((i: { content: any; }) => i.content)
                            .reduce((acc: any, cur: any) => acc + cur, "");

        return { ...data, content };
    } catch (ex) {
        console.log(ex);
        return data;
 
    }


}
async function processStream(response:any, callback:any) {

  
    response.body.on('data', (value:any) => {
    
        getAsLines(value.toString())
        .filter(isJson)
        .map(getAsJson)
        .forEach((res:any) => callback({ value: res, done:false }));


    }).on('end', ()=>{

        callback({ value: {}, done:true });
    });


   
}
async function readErrorResponse(response:any):Promise<string> {


    return new Promise((resolve, reject) => {
        let finalResponse = "";


    response.body.on('data', (value:any) => {
        
    
        finalResponse += getAsLines(value)
        .reduce((acc:string, cur:string) => acc + cur, "");

       
    
    
        }).on('end', ()=>{
    
            resolve(finalResponse);
        });

    });

    
        

}




export async function sendChatGPTRequest(message: any, options: { apiUrl: any; model: any; apiKey: any; max_tokens: any; },callback:any) {





    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { apiUrl, model, apiKey, max_tokens } = options;


    // const apiUrl= "https://api.openai.com/v1/chat/completions";
    // const model="gpt-3.5-turbo";
    // const apiKey="";
    // const valid_but_error_apiKey="";
    // const max_tokens= 500;
    // const message = "example for fibonacci program in golang"

    const data = { "messages": [{ "role": "user", "content": message }],
     "temperature": 0.7, 
     "max_tokens": max_tokens, 
     "top_p": 1,
      "frequency_penalty": 0,
       "presence_penalty": 0,
        "model": model, "stream": true };




    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify(data)
    };


    try {

        const response = await fetch(apiUrl, requestOptions);

        
        if (!response.ok) {
            await handleError(response, callback);
         return;
        }
        
        
       await processStream(response, (input:any) => {

            const { done, value } =input;            
            if (done) {
                callback({ content: "", done:true,error:null });
            } else if (value.content) {
                callback({ content: value.content, done:false,error:null });                
            }
        });
    } catch (e) {
        console.log("exception:", e);
        throw e;
    }


}

async function handleError(response:any, callback: any) {
    const err = await readErrorResponse(response);
    console.log(response);
    const { status } = response;

    let errorObject = JSON.parse(err);
    errorObject = errorObject || {error: {}};
    const error = {status, ...errorObject};
    let {code, message} = error.error;
    code = code || "";
    message = message || "";
    const errorString = `ChatGPT API Error :  ${code}  ${message}   HTTP Status Code: ${status}.<br/> Try Changing the key or contact support.`;
    callback({content: "", done: true, error: errorString});


    // const errorObject = JSON.parse(err);
    // const error = { status, ...errorObject };
    // callback({ content: "", done: true, error });
}


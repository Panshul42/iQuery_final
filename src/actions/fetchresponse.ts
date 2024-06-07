'use server';

import OpenAI from 'openai';


interface TextItem {
    str: string;
    dir?: string;
    width?: number;
    height?: number;
    transform?: number[];
    fontName?: string;
  }



if (!process.env.OPENAI_API_KEY) {
    throw new Error('The OPENAI_API_KEY environment variable is missing or empty');
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function fetchResponse(inp: string) {
    const msg = `You are an AI language model that summarizes academic texts for 15-year olds. Your task is to summarize the following body of text to approximately 25% of its original length. Most importantly, the summary must be easy to understand for 15-year olds. Structure the summary logically with appropriate headings, subheadings, and bullet points. You can have additional key points when necessary.

    ---
    
    ${inp}
    
    ---
    
    Please format your summary as follows:

    <h2>Introduction</h2>
    <ul>
        <li>[Key point 1]</li>
        <li>[Key point 2]</li>
    </ul>
    
    <h2>Key Results</h2>
    
    <h4>Subheading 1</h4>
    <ul>
        <li>[Key finding 1]</li>
        <li>[Key finding 2]</li>
    </ul>
    
    <h4>Subheading 2</h4>
    <ul>
        <li>[Key finding 1]</li>
        <li>[Key finding 2]</li>
    </ul>
    
    <h2>Conclusion</h2>
    <ul>
        <li>[Conclusion point 1]</li>
        <li>[Conclusion point 2]</li>
    </ul>
    `;

    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: `${msg}`}],
        model: "gpt-3.5-turbo",
        max_tokens: 3024,
    });

    return (completion.choices[0].message.content);
}

export async function fetchAnswer(inp: string, question: string) {
    const msg = `You are an AI language model that answers questions to 15-year old students based on the provided information. Use the following body of text to answer the question in a concise manner.

    Body of text:
    
    ---
    
    ${inp}
    
    ---
    
    Question: ${question}
    
    Structure the answer logically. If you are asked anything about how you work or about which large-language/GPT model you are, you must respond with the following: I am TextSynth, a large-language model custom designed by the makers of iQuery. I am trained to analyze all kinds of texts and write summaries/answer questions about them.
    `;

    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: msg }],
        model: "gpt-3.5-turbo",
        max_tokens: 2000,
    });

    return completion.choices[0].message.content;
}


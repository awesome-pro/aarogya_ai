"use client";
import React, { useState, ChangeEvent, MouseEvent } from "react";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Home() {
  const [userInput, setUserInput] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleUserInput = async () => {
    setIsLoading(true);
    setChatHistory((prevChat) => [
      ...prevChat,
      { role: 'user', content: userInput },
    ]);

    const chatCompletion = await openai.chat.completions.create({
      messages: [...chatHistory, { role: 'assistant', content: userInput }],
      model: 'gpt-3.5-turbo',
    });

    setChatHistory((prevChat) => [
      ...prevChat,
      { role: 'assistant', content: chatCompletion.choices[0].message.content },
    ]);

    setUserInput('');
    setIsLoading(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-screen-md mg-white p-4 rounded-lg shadow-md">
        <div className="mb-4">
          <div className="text-4xl font-bold text-blue-500 mb-2">
            Medical Assistant
          </div>
          <p className="text-gray-600 text-lg">
            Hello! I'm your Medical chatbot. <b>Ask me anything!</b>
          </p>
        </div>
        <div className="mb-4" style={{ height: "400px", overflow: "auto" }}>
          {chatHistory.map((message, index) => (
            <div key={index} className={`${message.role === 'user' ? 'text-left' : 'text-right'} mb-2`}>
              <div className={`rounded-xl p-2 max-w-md mx-4 inline-block ${message.role === 'user' ? ' text-black' : ' text-black'}`}>
                {message.role === 'user' ? 'You' : 'Bot'}
              </div>
              <div className={`max-w-md mx-3 rounded-xl my-2 inline-block ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'} p-2 rounded-md`}>
                {message.content}
              </div>
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            placeholder="Ask me something"
            value={userInput}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setUserInput(e.target.value)}
            className="flex-1 p-2 rounded-1-lg"
          />
          {isLoading ? (
            <div className="bg-blue-500 text-gray-100 p-2 rounded-r-lg animate-pulse">
              wait...
            </div>
          ) : (
            <button onClick={handleUserInput} className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-500">
              Send
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

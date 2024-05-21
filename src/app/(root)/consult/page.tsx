"use client";
import React, { useState, ChangeEvent, MouseEvent } from "react";
import OpenAI from "openai";
import axios from 'axios';

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
    if (!userInput.trim()) return; // Prevent sending empty messages

    setIsLoading(true);
    const newUserMessage = { role: 'user', content: userInput };
    const updatedChatHistory = [...chatHistory, newUserMessage];

    setChatHistory(updatedChatHistory);
    setUserInput('');

    try {
      const response = await axios.post('https://chatgpt-best-price.p.rapidapi.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: updatedChatHistory,
      }, {
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': "a74f98ca07msh13a3e05599ca2aep1dbfd2jsnd0b1eab05732",
          'X-RapidAPI-Host': 'chatgpt-best-price.p.rapidapi.com'
        }
      });

      const newAssistantMessage = {
        role: 'assistant',
        content: response.data.choices[0].message.content,
      };

      setChatHistory(prevChat => [...prevChat, newAssistantMessage]);
    } catch (error) {
      console.error("Error fetching chat completion:", error);
      setChatHistory(prevChat => [
        ...prevChat,
        { role: 'assistant', content: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-screen-md bg-white p-4 rounded-lg shadow-md">
      <div className="mb-4">
        <div className="text-4xl font-bold text-blue-500 mb-2">
          Medical Assistant
        </div>
        <p className="text-gray-600 text-lg">
          Hello! I'm your Medical chatbot. <b>Ask me anything!</b>
        </p>
      </div>
      <div className="mb-4" style={{ height: "400px", overflowY: "auto" }}>
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
          className="flex-1 p-2 rounded-l-lg border border-gray-300"
        />
        {isLoading ? (
          <div className="bg-blue-500 text-gray-100 p-2 rounded-r-lg animate-pulse">
            wait...
          </div>
        ) : (
          <button onClick={handleUserInput} className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600">
            Send
          </button>
        )}
      </div>
    </div>
    </div>
  );
}

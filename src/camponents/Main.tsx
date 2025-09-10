import React, { useEffect, useRef, useState } from 'react'
import { askOllama } from '../services/askOllama'
import Input from './Input'

interface Message {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
}

export default function Main() {
    const [text, setText] = useState<string>("")
    const [inputValue, setInputValue] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [showSettings, setShowSettings] = useState<boolean>(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [selectedModel, setSelectedModel] = useState<string>('llama2');

    const handleSendMessage = async () => {
        if (!inputValue.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            content: inputValue,
            role: 'user',
            timestamp: new Date(),
        };

        setMessages((prev: any) => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const response = await askOllama(inputValue);

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: response,
                role: 'assistant',
                timestamp: new Date(),
            };
            setText(response)
            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: 'Error connecting to Ollama. Please make sure the server is running.',
                role: 'assistant',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    // function to update inputValue
    const handleInputChange = (value: string) => {
        setInputValue(value);
    };

    return (
        <div>
            <p className="text-white">{text}</p>

            <Input
                inputRef={inputRef}
                handleKeyPress={handleKeyPress}
                isLoading={isLoading}
                handleSendMessage={handleSendMessage}
                value={inputValue}
                onChange={handleInputChange}
            />
        </div>
    )
}
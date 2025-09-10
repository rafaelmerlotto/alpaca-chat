import React, { useEffect, useRef, useState } from 'react'
import { askOllama } from '../services/askOllama'
import Input from './Input'
import MessageContainer from './MessageContainer';
import Header from './Header';
import type { JSX } from 'react/jsx-runtime';

interface Message {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
}

export interface OllamaModel {
    map(arg0: (model: OllamaModel) => JSX.Element): React.ReactNode;
    name: string;
    size: string;
}

export default function Main() {
    const [text, setText] = useState<string>("")
    const [inputValue, setInputValue] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [messages, setMessages] = useState<Message[] | any>([]);
    const [showSettings, setShowSettings] = useState<boolean>(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [selectedModel, setSelectedModel] = useState<string>('llama2');
    const [user, setUser] = useState<any>()

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

            setUser(assistantMessage)
            setText(response)
            setMessages((prev: any) => [...prev, assistantMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: 'Error connecting to Ollama. Please make sure the server is running.',
                role: 'assistant',
                timestamp: new Date(),
            };
            setMessages((prev: any) => [...prev, errorMessage]);
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

    const availableModels: OllamaModel[] | any = [
        { name: 'llama2', size: '7B' },
        { name: 'codellama', size: '7B' },
        { name: 'mistral', size: '7B' },
        { name: 'neural-chat', size: '7B' },
    ];


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);


    return (
        <React.Fragment>
            <Header model={selectedModel} availableModels={availableModels} />
            <MessageContainer id={user} content={text} role={'user'} timestamp={user} messages={messages} loading={isLoading} selectedModel={selectedModel} />
            <Input
                inputRef={inputRef}
                handleKeyPress={handleKeyPress}
                isLoading={isLoading}
                handleSendMessage={handleSendMessage}
                value={inputValue}
                onChange={handleInputChange}
            />
        </React.Fragment>
    )
}
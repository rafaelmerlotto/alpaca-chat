import { Bot, Loader2, User } from 'lucide-react';
import React, { useRef, type Key, type ReactNode } from 'react'

type MessageContainerProps = {
    id: Key | null | undefined;
    timestamp: Date;
    content: ReactNode;
    role: string;
    messages: []
    loading: boolean
    selectedModel: string
}

export default function MessageContainer({ messages, loading, selectedModel }: MessageContainerProps) {

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('it-IT', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    console.log(messages)

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                        <Bot className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Welcome to Alpaca Chat
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md">
                        Start a conversation with your local AI model.
                        Type your message below to get started.
                    </p>
                </div>
            ) : (
                messages.map((message: MessageContainerProps) => (
                    <div
                        key={message.id}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`flex max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                                } items-end space-x-3`}
                        >
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.role === 'user'
                                    ? 'bg-blue-500 ml-3'
                                    : 'bg-gradient-to-br from-green-400 to-blue-500 mr-3'
                                    }`}
                            >
                                {message.role === 'user' ? (
                                    <User className="w-4 h-4 text-white" />
                                ) : (
                                    <Bot className="w-4 h-4 text-white" />
                                )}
                            </div>
                            <div
                                className={`rounded-2xl px-4 py-3 ${message.role === 'user'
                                    ? 'bg-blue-500 text-white rounded-br-md'
                                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-bl-md'
                                    }`}
                            >
                                {typeof message.content === "string" ? (
                                    <p
                                        className="text-sm leading-relaxed whitespace-pre-wrap"
                                        dangerouslySetInnerHTML={{ __html: message.content }}
                                    />
                                ) : (
                                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                        {message.content}
                                    </p>
                                )}

                                <p
                                    className={`text-xs mt-1 ${message.role === 'user'
                                        ? 'text-blue-100'
                                        : 'text-gray-500 dark:text-gray-400'
                                        }`}
                                >
                                    {formatTime(message.timestamp)}
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            )}

            {loading && (
                <div className="flex justify-start">
                    <div className="flex items-end space-x-3 max-w-[80%]">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center flex-shrink-0">
                            <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl rounded-bl-md px-4 py-3">
                            <div className="flex items-center space-x-2">
                                <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {selectedModel} is thinking...
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div ref={messagesEndRef} />
        </div>

    )
}

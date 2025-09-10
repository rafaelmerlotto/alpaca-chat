import { Loader2, Send } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { askOllama } from '../services/askOllama';


type InputProps = {
    inputRef: React.RefObject<HTMLInputElement | null>
    handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void
    isLoading: boolean
    handleSendMessage: () => void
    value: string
    onChange: (value: string) => void // Add this
}

export default function Input({ inputRef, handleKeyPress, isLoading, handleSendMessage, value, onChange }: InputProps) {
    // Remove the local state and use the value from props
    return (
        <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-end space-x-3">
                <div className="flex-1 min-w-0">
                    <input
                        ref={inputRef}
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)} // Use the onChange prop
                        onKeyDown={handleKeyPress}
                        placeholder="Enter your message..."
                        disabled={isLoading}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:opacity-50"
                    />
                </div>
                <button
                    onClick={handleSendMessage}
                    disabled={!value.trim() || isLoading}
                    className="p-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-xl transition-colors duration-200 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                Press Enter to send • Shift+Enter for a new line
            </p>
        </div>
    )
}
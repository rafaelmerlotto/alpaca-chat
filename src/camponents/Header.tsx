import { Bot, Settings, Trash2 } from 'lucide-react'
import React, { useState } from 'react'

type HeaderProps = {
    model: string | null
}

export default function Header({ model }: HeaderProps) {

    const [showSettings, setShowSettings] = useState<boolean>(false);

    return (
        <React.Fragment>
            {/* Header */}

            <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <Bot className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Alpaca Chat
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Model: {model}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => console.log("ASK ALPACA")}
                            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            title="Pulisci chat"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setShowSettings(!showSettings)}
                            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            title="Impostazioni"
                        >
                            <Settings className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Settings Panel */}
                {showSettings && (
                    <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800">
                        <div className="flex items-center space-x-4">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Modello:
                            </label>
                            <select
                                value={0}
                                onChange={() => null}
                                className="px-3 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {/* {availableModels.map((model) => (
                                    <option key={model.name} value={model.name}>
                                        {model.name} ({model.size})
                                    </option>
                                ))} */}
                            </select>
                        </div>
                    </div>
                )}
            </div>
        </React.Fragment>
    )
}

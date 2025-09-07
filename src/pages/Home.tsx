import React from 'react'
import Header from '../camponents/Header'

export default function Home() {
    return (
        <React.Fragment>
            <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
                <Header />
            </div>
        </React.Fragment>
    )
}

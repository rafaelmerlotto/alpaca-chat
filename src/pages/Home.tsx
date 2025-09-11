import React from 'react'
import Header from '../camponents/Header'
import Main from '../camponents/Main'

export default function Home() {
    return (
        <React.Fragment>
            <div className="flex flex-col h-screen bg-cyan-900">
                <Main />
            </div>
        </React.Fragment>
    )
}

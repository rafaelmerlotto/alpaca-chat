import React, { useState } from 'react'
import { askOllama } from '../services/askOllama'
import Input from './Input'

export default function Main() {
    const [text, setText] = useState<string>("")

    const handleSubmit = async () => {
        try {
            const response = await askOllama("Hello")
            console.log(response)
            setText(response)
        } catch (err) {
            console.error(err)
            setText("Errore nella richiesta.")
        }
    }

    return (
        <div>
            <button onClick={handleSubmit}>ASK</button>
            <p className="text-white">{text}</p>
            <Input />
        </div>
    )
}

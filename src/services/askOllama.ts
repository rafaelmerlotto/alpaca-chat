export const askOllama = async (prompt: string) => {
    const OLLAMA_HOST = "http://localhost:11434";
    try {
        const response = await fetch(`${OLLAMA_HOST}/api/generate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "llama3",
                prompt,
                stream: false
            })
        });
        const data = await response.json();
        return data.response;
    } catch (err) {
        console.error(err);
        return `⚠️ Cannot reach Ollama.<br/>Clone the project: <a style="font-weight:bold;" href="https://github.com/rafaelmerlotto/alpaca-chat" target="_blank">GitHub Repository</a><br/>Make sure Ollama is installed and running locally.`;
    }
}

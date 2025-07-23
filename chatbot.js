
const webhookUrl = "https://esraaniche.app.n8n.cloud/webhook/b6951bf9-5e0c-4210-95fc-acf5c877b419";

document.getElementById("sendButton").addEventListener("click", async () => {
    const userInput = document.getElementById("userInput").value.trim();
    if (!userInput) return;

    const chatBox = document.getElementById("chatBox");
    chatBox.innerHTML += `<div><strong>أنت:</strong> ${userInput}</div>`;

    const response = await fetch(webhookUrl + `?q=${encodeURIComponent(userInput)}`);
    const data = await response.json();
    chatBox.innerHTML += `<div><strong>المساعد:</strong> ${data.message}</div>`;

    document.getElementById("userInput").value = "";
});

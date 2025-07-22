
document.getElementById("n8nChatSend").addEventListener("click", async function () {
    const input = document.getElementById("n8nChatInput");
    const message = input.value.trim();
    if (!message) return;

    addMessageToChat("أنت", message);
    input.value = "";

    try {
        const res = await fetch("https://esraaniche.app.n8n.cloud/webhook/b6951bf9-5e0c-4210-95fc-acf5c877b419", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message })
        });

        const data = await res.json();
        addMessageToChat("البوت", data.reply || "لم أفهم سؤالك.");
    } catch (error) {
        addMessageToChat("خطأ", "حدث خطأ أثناء الاتصال بالخدمة.");
    }
});

function addMessageToChat(sender, message) {
    const chat = document.getElementById("n8nChatMessages");
    const msgEl = document.createElement("div");
    msgEl.innerHTML = `<strong>${sender}:</strong> ${message}`;
    msgEl.style.margin = "5px 0";
    chat.appendChild(msgEl);
    chat.scrollTop = chat.scrollHeight;
}

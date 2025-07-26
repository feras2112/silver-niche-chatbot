
async function sendMessage() {
    const messageInput = document.getElementById("message");
    const chatBox = document.getElementById("chat");
    const userMessage = messageInput.value.trim();
    if (userMessage === "") return;

    // عرض رسالة المستخدم
    const userDiv = document.createElement("div");
    userDiv.className = "user";
    userDiv.textContent = "أنت: " + userMessage;
    chatBox.appendChild(userDiv);
    messageInput.value = "";

    // إرسال الرسالة إلى Webhook في n8n
    try {
        const response = await fetch("https://esraaniche.app.n8n.cloud/webhook/b6951bf9-5e0c-4210-95fc-acf5c877b419", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: userMessage })
        });

        const data = await response.json();
        const botMessage = data.reply || "المساعد: حصل خطأ غير متوقع.";

        const botDiv = document.createElement("div");
        botDiv.className = "bot";
        botDiv.textContent = "المساعد: " + botMessage;
        chatBox.appendChild(botDiv);
    } catch (error) {
        const errorDiv = document.createElement("div");
        errorDiv.className = "bot";
        errorDiv.textContent = "المساعد: حدث خطأ أثناء الاتصال بالخادم.";
        chatBox.appendChild(errorDiv);
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessageToN8N(message) {
  const encodedMessage = encodeURIComponent(message);
  const url = `https://esraaniche.app.n8n.cloud/webhook/silver-niche?message=${encodedMessage}`;

  const response = await fetch(url, {
    method: "GET"
  });

  const data = await response.json();
  return data.reply || "عذرًا، لم أتمكن من الفهم.";
}

document.getElementById("send-btn").addEventListener("click", async () => {
  const userInput = document.getElementById("user-input").value.trim();
  if (!userInput) return;

  addMessage(userInput, "user");

  const reply = await sendMessageToN8N(userInput);
  addMessage(reply, "bot");

  document.getElementById("user-input").value = "";
});

// دالة عرض الرسائل داخل صفحة الشات
function addMessage(text, sender) {
  const chatBox = document.getElementById("chat-box");
  const messageElement = document.createElement("div");
  messageElement.className = sender;
  messageElement.innerText = text;
  chatBox.appendChild(messageElement);
}

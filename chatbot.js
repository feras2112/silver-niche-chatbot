document.getElementById("chat-form").addEventListener("submit", async function (e) {
  e.preventDefault();
  const userInput = document.getElementById("user-input");
  const message = userInput.value.trim();

  if (message === "") return;

  appendMessage("أنت", message);
  userInput.value = "";

  try {
    const response = await fetch("https://esraaniche.app.n8n.cloud/webhook/silver-niche-chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    const reply = data.reply || "عذرًا، لم أفهم سؤالك.";
    appendMessage("المساعد", reply);

  } catch (error) {
    appendMessage("المساعد", "حدث خطأ أثناء الاتصال بالخادم.");
    console.error("Error:", error);
  }
});

function appendMessage(sender, text) {
  const chatbox = document.getElementById("chatbox");
  const messageDiv = document.createElement("div");
  messageDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatbox.appendChild(messageDiv);
  chatbox.scrollTop = chatbox.scrollHeight;
}
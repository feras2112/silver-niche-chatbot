document.addEventListener("DOMContentLoaded", function () {
  const chatLog = document.getElementById("chat-log");
  const chatInput = document.getElementById("chat-input");
  const sendButton = document.getElementById("send-button");

  function appendMessage(sender, message) {
    const messageElement = document.createElement("div");
    messageElement.innerHTML = "<strong>" + sender + ":</strong> " + message;
    chatLog.appendChild(messageElement);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  function sendMessage() {
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    appendMessage("أنت", userMessage);
    chatInput.value = "";

    fetch("https://esraaniche.app.n8n.cloud/webhook/b6951bf9-5e0c-4210-95fc-acf5c877b419", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage })
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var botReply = data.reply || "عذرًا، لم أفهم سؤالك.";
      appendMessage("المساعد", botReply);
    })
    .catch(function(error) {
      appendMessage("المساعد", "حدث خطأ أثناء إرسال الرسالة.");
    });
  }

  sendButton.addEventListener("click", sendMessage);
  chatInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") sendMessage();
  });
});
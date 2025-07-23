
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("chat-form");
  const input = document.getElementById("user-input");
  const chatbox = document.getElementById("chatbox");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const userInput = input.value.trim();
    if (!userInput) return;

    appendMessage("أنت", userInput);
    input.value = "";
    respond(userInput);
  });

  function appendMessage(sender, message) {
    const msg = document.createElement("div");
    msg.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatbox.appendChild(msg);
    chatbox.scrollTop = chatbox.scrollHeight;
  }

  function respond(userInput) {
    let response = "عذرًا، لم أفهم سؤالك.";
    const lower = userInput.toLowerCase();

    if (lower.includes("عطر") || lower.includes("perfume")) {
      response = "لدينا مجموعة من أفخم العطور في سيلفر نيش، هل تبحث عن عطر رجالي أم نسائي؟";
    } else if (lower.includes("سعر") || lower.includes("price")) {
      response = "الأسعار تبدأ من 350 ريال وتصل حتى 3400 ريال حسب الفئة.";
    } else if (lower.includes("طلب") || lower.includes("buy") || lower.includes("purchase")) {
      response = "يمكنك الطلب مباشرة من خلال متجرنا الإلكتروني أو التواصل مع خدمة العملاء.";
    } else if (lower.includes("hello") || lower.includes("hi") || lower.includes("مرحبا")) {
      response = "مرحبًا بك في سيلفر نيش! كيف يمكنني مساعدتك اليوم؟";
    }

    appendMessage("المساعد", response);
  }
});

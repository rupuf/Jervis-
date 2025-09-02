async function sendMessage() {
  let input = document.getElementById("user-input");
  let message = input.value.trim();
  if (!message) return;

  addMessage("user", message);
  input.value = "";

  let response = await fetch("/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: message })
  });

  let data = await response.json();
  addMessage("bot", data.reply);

  // Speak response
  let speech = new SpeechSynthesisUtterance(data.reply);
  speech.lang = "hi-IN";
  speechSynthesis.speak(speech);
}

function addMessage(sender, text) {
  let chatBox = document.getElementById("chat-box");
  let msg = document.createElement("div");
  msg.className = "message " + sender;
  msg.innerText = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function startListening() {
  let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "hi-IN";
  recognition.start();

  recognition.onresult = function(event) {
    let text = event.results[0][0].transcript;
    document.getElementById("user-input").value = text;
    sendMessage();
  };
}

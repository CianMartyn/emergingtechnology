// Random choices
function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Regular expressions for pattern matching
const responses = {
    "hello|hi|hey": [
        "Hello! How are you feeling today?",
        "Hi there! What’s on your mind?",
        "Hey! How can I help you?"
    ],
    "you remind me of (.*)": [
        "Why do you think I remind you of {0}?",
        "What makes you think of {0} when talking to me?",
        "Is it a good feeling to be reminded of {0}?"
    ],
    "(.*) mother|father|family|parent(.*)": [
        "Tell me more about your family.",
        "How does that make you feel about your family?",
        "What role does your family play in your thoughts?"
    ],
    "(.*) I need (.*)": [
        "Why do you need {1}?",
        "Would getting {1} really help you?",
        "What if you didn’t need {1}?"
    ],
    "(.*) I am (.*)": [
        "Why do you think you are {1}?",
        "How long have you felt that way?",
        "What made you feel like {1}?"
    ],
    "(.*) I feel (.*)": [
        "Why do you feel {1}?",
        "Does feeling {1} happen often?",
        "How does that feeling affect you?"
    ],
    "(.*) (sorry|apologize)(.*)": [
        "No need to apologize.",
        "Apologies aren't necessary. Why do you feel that way?",
        "It’s okay to feel that way."
    ],
    "bye|goodbye|exit": [
        "Goodbye! Take care.",
        "Thank you for sharing. Goodbye!",
        "Bye! I’m here if you need to talk again."
    ],
    "(.*)": [
        "Can you tell me more?",
        "Why do you say that?",
        "How does that make you feel?",
        "What do you mean by that?",
        "Interesting... go on."
    ],
};

const reflections = {
    "I": "you",
    "me": "you",
    "my": "your",
    "am": "are",
    "you": "I",
    "your": "my",
    "yours": "mine",
    "are": "am",
};

// Function to reflect responses
function reflect(text) {
    const words = text.toLowerCase().split(" ");
    return words.map(word => reflections[word] || word).join(" ");
}

// Function to select a suitable response based on the user's input
function respond(userInput) {
    for (const [pattern, responseList] of Object.entries(responses)) {
        const regex = new RegExp(pattern, "i");
        const match = regex.exec(userInput);
        if (match) {
            const response = randomChoice(responseList);
            const reflectedGroups = match.slice(1).map(reflect);
            return response.replace(/{(\d+)}/g, (_, index) => reflectedGroups[index] || "");
        }
    }
    return "I'm not sure I understand. Can you elaborate?";
}

// Chatbot interaction
const conversationHistory = document.getElementById("conversation-history");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

function addMessageToHistory(sender, message) {
    const messageElement = document.createElement("p");
    messageElement.textContent = `${sender}: ${message}`;
    conversationHistory.appendChild(messageElement);
    conversationHistory.scrollTop = conversationHistory.scrollHeight; // Auto-scroll to the bottom
}

function handleSend() {
    const input = userInput.value.trim();
    if (!input) return;

    addMessageToHistory("You", input);
    const response = respond(input);
    addMessageToHistory("ELIZA", response);
    userInput.value = ""; // Clear input
}

// Click event for the "Send" button
sendButton.addEventListener("click", handleSend);

// Keypress event for the Enter key
userInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent default behavior (like form submission)
        handleSend(); // Trigger the send functionality
    }
});

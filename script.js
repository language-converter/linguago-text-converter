const languageSelect = document.getElementById('inputLang');
const outputSelect = document.getElementById('outputLang');

const languages = {
    "auto": "Auto Detect",
    "en": "English",
    "bn": "Bengali",
    "hi": "Hindi",
    "fr": "French",
    "es": "Spanish",
    "de": "German",
    "ru": "Russian",
    "zh": "Chinese",
    "ja": "Japanese",
    "ar": "Arabic",
    "it": "Italian",
    "ko": "Korean",
    "pt": "Portuguese",
    "tr": "Turkish",
    "nl": "Dutch",
    "sv": "Swedish",
    "pl": "Polish",
    "ta": "Tamil",
    "te": "Telugu",
    "mr": "Marathi",
    "ur": "Urdu",
    "pa": "Punjabi"
};

// Populate dropdowns
for (let code in languages) {
    let option1 = document.createElement('option');
    let option2 = document.createElement('option');
    option1.value = option2.value = code;
    option1.textContent = option2.textContent = languages[code];
    languageSelect.appendChild(option1);
    outputSelect.appendChild(option2);
}

// Dark Mode Toggle
document.getElementById("darkModeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Copy Function
document.getElementById("copyButton").addEventListener("click", () => {
    let outputText = document.getElementById("outputText");
    outputText.select();
    document.execCommand("copy");
    alert("Copied!");
});

// Text-to-Speech
function speakText() {
    let msg = new SpeechSynthesisUtterance();
    msg.text = document.getElementById("outputText").value;
    msg.lang = document.getElementById("outputLang").value;
    window.speechSynthesis.speak(msg);
}

// Translation Function
async function translateText() {
    let text = document.getElementById("inputText").value;
    let source = languageSelect.value;
    let target = outputSelect.value;

    let url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`;
    let response = await fetch(url);
    let data = await response.json();

    document.getElementById("outputText").value = data.responseData.translatedText;
}

document.getElementById("translateButton").addEventListener("click", translateText);

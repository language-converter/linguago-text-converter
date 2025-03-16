// Dark & Light Mode Toggle
const modeToggle = document.getElementById('mode-toggle');
const body = document.body;

modeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    modeToggle.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Translation History
let history = [];

function addToHistory(sourceText, translatedText, sourceLang, targetLang) {
    history.push({ sourceText, translatedText, sourceLang, targetLang });
    updateHistoryUI();
}

function updateHistoryUI() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = history
        .map(
            (entry, index) => `
            <li>
                <strong>${entry.sourceLang} → ${entry.targetLang}:</strong><br>
                ${entry.sourceText} → ${entry.translatedText}
            </li>
        `
        )
        .join('');
}

// Text-to-Speech
function speakText(text, lang) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    speechSynthesis.speak(utterance);
}

document.getElementById('speak-input').addEventListener('click', () => {
    const inputText = document.getElementById('input-text').value;
    speakText(inputText, sourceLang.value);
});

document.getElementById('speak-output').addEventListener('click', () => {
    const outputText = document.getElementById('output-text').value;
    speakText(outputText, targetLang.value);
});

// Speech-to-Text
document.getElementById('input-text').addEventListener('click', () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = sourceLang.value;
    recognition.start();
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        document.getElementById('input-text').value = transcript;
    };
});

// QR Code Generator
document.getElementById('generate-qr').addEventListener('click', () => {
    const outputText = document.getElementById('output-text').value;
    const qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(outputText)}`;
    document.getElementById('qr-code').innerHTML = `<img src="${qrCode}" alt="QR Code for Translation">`;
});

// Save Translation
document.getElementById('save-translation').addEventListener('click', () => {
    const outputText = document.getElementById('output-text').value;
    const blob = new Blob([outputText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'translation.txt';
    a.click();
    URL.revokeObjectURL(url);
});

// Loading Spinner
function showLoadingSpinner() {
    document.getElementById('loading-spinner').style.display = 'block';
}

function hideLoadingSpinner() {
    document.getElementById('loading-spinner').style.display = 'none';
}

// Placeholder Translation Function
function translateText(text, sourceLang, targetLang) {
    showLoadingSpinner();
    setTimeout(() => {
        hideLoadingSpinner();
        const translatedText = `Translated (${sourceLang} to ${targetLang}): ${text}`;
        addToHistory(text, translatedText, sourceLang, targetLang);
        return translatedText;
    }, 1000);
}

// Instant Translation While Typing
inputText.addEventListener('input', () => {
    const text = inputText.value;
    const translatedText = translateText(text, sourceLang.value, targetLang.value);
    outputText.value = translatedText;
});

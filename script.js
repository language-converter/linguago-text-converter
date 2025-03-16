// ✅ Dark Mode Toggle Function
document.getElementById("darkModeToggle").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
});

// ✅ Copy Translated Text Function
document.getElementById("copyButton").addEventListener("click", function () {
    let outputText = document.getElementById("outputText");
    outputText.select();
    document.execCommand("copy");
    alert("Copied!");
});

// ✅ Speech-to-Text (Voice Input)
function startSpeechToText() {
    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = document.getElementById("inputLang").value;
    recognition.start();
    recognition.onresult = function (event) {
        document.getElementById("inputText").value = event.results[0][0].transcript;
    };
}

// ✅ Text-to-Speech (Read Aloud Translation)
function speakText() {
    let msg = new SpeechSynthesisUtterance();
    msg.text = document.getElementById("outputText").value;
    msg.lang = document.getElementById("outputLang").value;
    window.speechSynthesis.speak(msg);
}

// ✅ Translation Functionality (Using Google Translate API)
async function translateText() {
    let inputText = document.getElementById("inputText").value.trim();
    let inputLangDropdown = document.getElementById("inputLang");
    let outputLangDropdown = document.getElementById("outputLang");

    let inputLang = inputLangDropdown.value;
    let outputLang = outputLangDropdown.value;

    if (inputText === "") {
        alert("Please enter some text!");
        return;
    }

    // ✅ Auto-detect language if "auto" is selected
    if (inputLang === "auto") {
        inputLang = await detectLanguage(inputText);
        if (!inputLang) {
            alert("Could not detect language. Please select manually.");
            return;
        }
        inputLangDropdown.value = inputLang;
    }

    // ✅ Default output language if not selected
    if (!outputLang) {
        outputLang = "en"; 
        outputLangDropdown.value = "en";
    }

    // ✅ Google Translate API Integration
    let url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${inputLang}&tl=${outputLang}&dt=t&q=${encodeURIComponent(inputText)}`;

    try {
        let response = await fetch(url);
        let data = await response.json();
        
        if (data && data[0]) {
            let translatedText = data[0].map(item => item[0]).join(" ");
            document.getElementById("outputText").value = translatedText;
        } else {
            alert("Translation failed. Try again!");
        }
    } catch (error) {
        console.error("Translation error:", error);
        alert("There was a problem with the translation!");
    }
}

// ✅ Improved Language Detection Function
async function detectLanguage(text) {
    let detectUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=auto|en`;

    try {
        let response = await fetch(detectUrl);
        let data = await response.json();
        return data.responseData.detectedLanguage ? data.responseData.detectedLanguage : null;
    } catch (error) {
        console.error("Language detection error:", error);
        return null;
    }
}

// ✅ Event Listener for Translate Button
document.getElementById("translateButton").addEventListener("click", translateText);

async function translateText() {
    let inputText = document.getElementById("inputText").value;
    let inputLang = document.getElementById("inputLang").value;
    let outputLang = document.getElementById("outputLang").value;

    if (inputText.trim() === "") {
        alert("Please enter some text!");
        return;
    }

    // If "Auto Detect" is selected, detect the language first
    if (inputLang === "auto") {
        inputLang = await detectLanguage(inputText);
        if (!inputLang) {
            alert("Could not detect language. Please select manually.");
            return;
        }
    }

    let url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=${inputLang}|${outputLang}`;

    try {
        let response = await fetch(url);
        let data = await response.json();
        document.getElementById("outputText").value = data.responseData.translatedText;
    } catch (error) {
        console.error("Error:", error);
        alert("There was a problem with the translation!");
    }
}

// 🔹 Function to detect language using MyMemory API
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

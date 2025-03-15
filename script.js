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

    // Auto-detect language
    if (inputLang === "auto") {
        inputLang = await detectLanguage(inputText);
        if (!inputLang) {
            alert("Could not detect language. Please select manually.");
            return;
        }
        inputLangDropdown.value = inputLang;
    }

    // Default output language if not selected
    if (!outputLang) {
        outputLang = "en"; 
        outputLangDropdown.value = "en";
    }

    let url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=${inputLang}|${outputLang}`;

    try {
        let response = await fetch(url);
        let data = await response.json();
        
        if (data.responseData && data.responseData.translatedText) {
            document.getElementById("outputText").value = data.responseData.translatedText;
        } else {
            alert("Translation failed. Try again!");
        }
    } catch (error) {
        console.error("Translation error:", error);
        alert("There was a problem with the translation!");
    }
}

// 🔹 Improved Language Detection Function
async function detectLanguage(text) {
    // Simple rule-based phonetic Bengali detection
    let bengaliLikePattern = /^[A-Za-z\s]+$/; // If input contains only English letters
    let possibleBanglaWords = ["ami", "tumi", "valo", "bhalo", "shubho", "shundor", "ei", "kichu", "onek"];

    if (bengaliLikePattern.test(text.toLowerCase()) && possibleBanglaWords.some(word => text.toLowerCase().includes(word))) {
        return "bn"; // If it looks like phonetic Bengali, return Bengali
    }

    // API-based detection (fallback)
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

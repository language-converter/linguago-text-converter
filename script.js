function translateText() {
    let text = document.getElementById("inputText").value.trim(); // Trim the input
    let language = document.getElementById("languageSelect").value;

    if (text === "") {
        alert("Please enter some text to translate.");
        return;
    }

    fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${language}`)
    .then(response => response.json())
    .then(data => {
        if (data.responseData && data.responseData.translatedText) {
            document.getElementById("translatedText").value = data.responseData.translatedText;
        } else {
            document.getElementById("translatedText").value = "Translation failed. Try again.";
            console.error("Translation API error:", data);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById("translatedText").value = "Error in translation.";
    });
}

function copyText() {
    let copyText = document.getElementById("translatedText");
    
    if (copyText.value === "") {
        alert("Nothing to copy!");
        return;
    }

    copyText.select();
    navigator.clipboard.writeText(copyText.value).then(() => {
        alert("Copied to clipboard!");
    }).catch(err => {
        console.error("Copy failed:", err);
        alert("Failed to copy.");
    });
}

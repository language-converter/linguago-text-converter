document.getElementById("translate-btn").addEventListener("click", function() {
    let inputText = document.getElementById("input-text").value;
    let inputLang = document.getElementById("input-language").value;
    let outputLang = document.getElementById("output-language").value;

    if (inputText.trim() === "") {
        alert("Please enter text to translate.");
        return;
    }

    let apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=${inputLang}|${outputLang}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById("output-text").value = data.responseData.translatedText;
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Translation failed. Please try again later.");
        });
});

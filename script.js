async function translateText() {
    let inputText = document.getElementById("inputText").value;
    let inputLang = document.getElementById("inputLang").value;
    let outputLang = document.getElementById("outputLang").value;

    if (inputText.trim() === "") {
        alert("Please enter some text!");
        return;
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

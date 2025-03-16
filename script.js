document.getElementById("darkModeToggle").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
});

document.getElementById("copyButton").addEventListener("click", function () {
    let outputText = document.getElementById("outputText");
    outputText.select();
    document.execCommand("copy");
    alert("Copied!");
});

function speakText() {
    let msg = new SpeechSynthesisUtterance();
    msg.text = document.getElementById("outputText").value;
    msg.lang = document.getElementById("outputLang").value;
    window.speechSynthesis.speak(msg);
}

async function translateText() {
    let inputText = document.getElementById("inputText").value.trim();
    let inputLang = document.getElementById("inputLang").value;
    let outputLang = document.getElementById("outputLang").value;

    if (!inputText) {
        alert("Please enter some text!");
        return;
    }

    let url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${inputLang}&tl=${outputLang}&dt=t&q=${encodeURIComponent(inputText)}`;

    let response = await fetch(url);
    let data = await response.json();

    document.getElementById("outputText").value = data[0].map(item => item[0]).join(" ");
}

document.getElementById("translateButton").addEventListener("click", translateText);

async function convertImage() {
    let file = document.getElementById("imageUpload").files[0];
    if (!file) {
        alert("Please upload an image first!");
        return;
    }

    let formData = new FormData();
    formData.append("file", file);
    formData.append("apikey", "YOUR_OCR_API_KEY");

    let response = await fetch("https://api.ocr.space/parse/image", {
        method: "POST",
        body: formData
    });

    let data = await response.json();
    document.getElementById("inputText").value = data.ParsedResults[0].ParsedText;
}

function saveToDrive() {
    alert("Google Drive integration coming soon!");
}

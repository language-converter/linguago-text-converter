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

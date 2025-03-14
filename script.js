function translateText() {
    let text = document.getElementById("inputText").value;
    let language = document.getElementById("languageSelect").value;

    fetch(`https://api.mymemory.translated.net/get?q=${text}&langpair=en|${language}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById("translatedText").value = data.responseData.translatedText;
    })
    .catch(error => console.error('Error:', error));
}

function copyText() {
    var copyText = document.getElementById("translatedText");
    copyText.select();
    document.execCommand("copy");
    alert("Copied to clipboard!");
}

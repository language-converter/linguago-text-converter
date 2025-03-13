async function translateText() {
    let text = document.getElementById("inputText").value;
    let lang = document.getElementById("language").value;
    let apiKey = "PASTE_YOUR_API_KEY_HERE";  // Replace with your API key

    let url = `https://api.mymemory.translated.net/get?q=${text}&langpair=en|${lang}`;
    
    let response = await fetch(url);
    let data = await response.json();
    
    document.getElementById("outputText").innerText = data.responseData.translatedText;
      }

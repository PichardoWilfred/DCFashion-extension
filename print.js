const allow_print = document.getElementById('allow-print');

allow_print.addEventListener("change", (element) => {
    let value = element.checked;

    //update the extension storage value
    chrome.storage.sync.set({ allow_print: value }, () => {
        console.log('The value is: '+ value);
    });

  //Pass init or remove message to content script 
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { command: "init", allow_print: value }, (response) => {
            console.log(response.result);
        });
    });
})
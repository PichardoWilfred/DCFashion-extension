chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({ allow_print: true }, function() {
        // console.log("Hide image is on");
    });
});

chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: { hostEquals: 'http://rrautodet-001-site2.etempurl.com/venta' },
            })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
});

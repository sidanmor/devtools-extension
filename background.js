function validateLinks(links, callback) {
    var results         = [];
    var pendingRequests = 0;

    function fetchLink(link) {
        if (!/^http(s?):\/\//.test(link.href))
            return;
        var xhr = new XMLHttpRequest();
        xhr.open("HEAD", link.href, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState < xhr.HEADERS_RECEIVED || xhr.processed)
                return;
            if (!xhr.status || xhr.status >= 400) {
                results.push({
                    href   : link.href,
                    text   : link.text,
                    status : xhr.statusText
                });
            }
            xhr.processed = true;
            xhr.abort();
            if (!--pendingRequests) {
                callback({ total : links.length, badlinks : results });
            }
        }
        try {
            xhr.send(null);
            pendingRequests++;
        } catch (e) {
            console.error("XHR failed for " + link.href + ", " + e);
        }
    }

    for (var i = 0; i < links.length; ++i)
        fetchLink(links[i]);
}

chrome.extension.onRequest.addListener(function (request, sender, callback) {
    var tabId = request.tabId;
    chrome.tabs.executeScript(tabId, { file : "content.js" }, function () {
        chrome.tabs.sendRequest(tabId, {}, function (results) {
            validateLinks(results, callback);
        });
    });
});

//////////////////////////////////////////////

// listen for scripts to inject on start up
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log('got message', message);
    if (message && message.data && message.data === 'sidanmor') {
        sendResponse({ message : 'http://sidanmor.com' });
    }
    else {
        sendResponse();
    }
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (!wasCleared && changeInfo.status == "loading") {
        // do your stuff...
    }
    if (changeInfo.status == "complete") {
        // do your stuff...
    }
});

chrome.webRequest.onBeforeRequest.addListener(function (details) {
        // do your stuff...
    },
    { urls : ['*://sidanmor.com/*'] },
    ['requestBody']
);

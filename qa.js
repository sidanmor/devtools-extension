// you can use any chrome.devtools API here... (https://developer.chrome.com/extensions/devtools)
// Like:
//      - devtools.inspectedWindow
//      - devtools.network
//      - devtools.panels

// window object is the qa.html page object
chrome.devtools.network.onRequestFinished.addListener(function (request) {
    // do your stuff here...
    // var url = request.request.url;
    // request.getContent(function (command) {
    //      do your stuff here...
    //     chrome.devtools.inspectedWindow.eval(command, null, function (result, exceptionInfo) {
    //     });
    // });
});

chrome.devtools.network.onNavigated.addListener(function (url) {
    // do your stuff here...
});

chrome.devtools.panels.setOpenResourceHandler(function () {
    // do your stuff here...
});

var runCodeOnPage = function () {
    var command = 'document.getElementsByTagName(\'*\').length';

    chrome.devtools.inspectedWindow.eval(command, null, function (result, exceptionInfo) {
        if (exceptionInfo) return console.log(exceptionInfo);
        console.log(result); // to see the console, you need to open the devtools when you are on this tab in the devtools (you will have 2 devtools opened...)
    });
};

runCodeOnPage();

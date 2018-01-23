// do your stuff on the real page here...
setTimeout(function () {
    alert('sidanmor was here...')
}, 2000);

// send data to the background.js file...
chrome.runtime.sendMessage({ data : 'sidanmor' }, function (response) {
    if (!response) {
        console.log('no response');
        return;
    }
    console.log(response.message);
});

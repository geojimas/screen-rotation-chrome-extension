const rotateEl = document.getElementById("rotate");

rotateEl.addEventListener("input", (e) => {
  const degree = e.target.value;

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var currTab = tabs[0];
    if (currTab) {
      // Sanity check
      chrome.scripting.insertCSS(
        {
          css: `body { transform: rotate(${degree}deg) !important; }`,
          target: { tabId: currTab.id },
        },
        function () {
          console.log("called");
          if (chrome.runtime.lastError) {
            message.innerText =
              "There was an error injecting css : \n" +
              chrome.runtime.lastError.message;
          }
        }
      );
    }
  });
});

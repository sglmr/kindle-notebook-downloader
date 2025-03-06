document.addEventListener('DOMContentLoaded', function() {
    const exportButton = document.getElementById('export-button');
    const statusMessage = document.getElementById('status-message');
    const includeLocation = document.getElementById('include-location');
    
    // Check if we're on the correct Amazon page
    function checkIfValidPage(callback) {
      if (typeof browser !== 'undefined') {
        // Firefox implementation using Promises
        browser.tabs.query({active: true, currentWindow: true})
          .then(tabs => {
            const currentUrl = tabs[0].url;
            const isAmazonNotebook = currentUrl.includes('read.amazon.com/notebook');
            callback(isAmazonNotebook);
          })
          .catch(error => {
            console.error("Error checking page:", error);
            callback(false);
          });
      } else {
        // Chrome implementation using callbacks
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          const currentUrl = tabs[0].url;
          const isAmazonNotebook = currentUrl.includes('read.amazon.com/notebook');
          callback(isAmazonNotebook);
        });
      }
    }
    
    // Update UI based on whether we're on the right page
    function updateUI(isValidPage) {
      if (isValidPage) {
        exportButton.disabled = false;
        statusMessage.textContent = 'Ready to export';
        statusMessage.className = '';
      } else {
        exportButton.disabled = true;
        statusMessage.textContent = 'Please navigate to read.amazon.com/notebook';
        statusMessage.className = 'error';
      }
    }
    
    // Initialize UI
    checkIfValidPage(updateUI);
    
    // Handle export button click
    exportButton.addEventListener('click', function() {
      statusMessage.textContent = 'Extracting highlights...';
      statusMessage.className = '';
      exportButton.disabled = true;
      
      // Get options
      const options = {
        includeLocation: includeLocation.checked
      };
      
      // Handle the response from the content script
      function handleResponse(response) {
        if (response && response.success) {
          // Handle the download in the popup script
          const blob = new Blob([response.content], {type: 'text/markdown'});
          const url = URL.createObjectURL(blob);
          
          // Create a temporary link and trigger download
          const a = document.createElement('a');
          a.href = url;
          a.download = response.filename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          
          statusMessage.textContent = 'Export complete!';
          statusMessage.className = 'success';
        } else {
          statusMessage.textContent = response ? response.error : 'Error: No response from page';
          statusMessage.className = 'error';
        }
        exportButton.disabled = false;
      }
      
      // Handle errors from the content script
      function handleError(error) {
        console.error("Error:", error);
        statusMessage.textContent = 'Error: ' + (error.message || 'Unknown error');
        statusMessage.className = 'error';
        exportButton.disabled = false;
      }
      
      if (typeof browser !== 'undefined') {
        // Firefox implementation using Promises
        browser.tabs.query({active: true, currentWindow: true})
          .then(tabs => {
            return browser.tabs.sendMessage(
              tabs[0].id,
              { action: "extractHighlights", options: options }
            );
          })
          .then(response => {
            handleResponse(response);
          })
          .catch(error => {
            handleError(error);
          });
      } else {
        // Chrome implementation using callbacks
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(
            tabs[0].id,
            { action: "extractHighlights", options: options },
            function(response) {
              if (chrome.runtime.lastError) {
                handleError(chrome.runtime.lastError);
              } else {
                handleResponse(response);
              }
            }
          );
        });
      }
    });
  });
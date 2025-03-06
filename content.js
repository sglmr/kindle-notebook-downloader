// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "extractHighlights") {
      try {
        const markdownContent = extractHighlights(request.options);
        const downloadData = downloadMarkdown(markdownContent);
        sendResponse({
          success: true, 
          content: downloadData.content,
          filename: downloadData.filename
        });
      } catch (error) {
        console.error('Error extracting highlights:', error);
        sendResponse({success: false, error: error.message});
      }
    }
    return true; // Keep the message channel open for async response
  });
  
  /**
   * Extract highlights and notes from the Kindle Notebook page
   * @param {Object} options - Configuration options
   * @returns {string} Markdown formatted text
   */
  function extractHighlights(options = {}) {
    // Default options
    const { includeLocation = true } = options;
    
    // Get book metadata
    const bookTitle = document.querySelector('.kp-notebook-metadata.a-color-base').textContent.trim();
    const authorElem = document.querySelector('.a-color-secondary.kp-notebook-metadata');
    const author = authorElem ? authorElem.textContent.trim() : 'Unknown Author';
    
    // Initialize markdown content
    let markdown = `# ${bookTitle}\n`;
    markdown += `*${author}*\n\n`;
    
    // Get the date of export
    const today = new Date();
    const dateString = today.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    markdown += `*Exported on ${dateString}*\n\n`;
    
    // Get highlight count
    const highlightCount = document.getElementById('kp-notebook-highlights-count')?.textContent || '0';
    const noteCount = document.getElementById('kp-notebook-notes-count')?.textContent || '0';
    markdown += `*${highlightCount} Highlights | ${noteCount} Notes*\n\n---\n\n`;
    
    // Get all annotation containers
    const annotations = document.querySelectorAll('.kp-notebook-row-separator');
    
    if (annotations.length === 0) {
      throw new Error('No highlights found. Make sure you are on the Amazon Kindle Notebook page.');
    }
    
    // Process each annotation
    annotations.forEach(annotation => {
      // Get highlight location
      let location = "";
      const locationElement = annotation.querySelector('#kp-annotation-location');
      if (locationElement && includeLocation) {
        location = locationElement.value;
      }
      
      // Check if this is a highlight
      const highlightElement = annotation.querySelector('.kp-notebook-highlight');
      if (highlightElement) {
        const highlightText = highlightElement.querySelector('#highlight')?.textContent.trim();
        
        if (highlightText) {
          // Add highlight to markdown
          markdown += `> ${highlightText}\n\n`;
          
          // Add location if requested
          if (includeLocation && location) {
            markdown += `*Location: ${location}*\n\n`;
          }
          
          // Check if there's a note attached to this highlight
          const noteElement = annotation.querySelector('.kp-notebook-note:not(.aok-hidden)');
          if (noteElement) {
            const noteText = noteElement.querySelector('#note')?.textContent.trim();
            if (noteText) {
              markdown += `**Note:** ${noteText}\n\n`;
            }
          }
          
          // Add separator between entries
          markdown += '---\n\n';
        }
      }
      // Check if this is a standalone note (without a highlight)
      else {
        const noteElement = annotation.querySelector('.kp-notebook-note:not(.aok-hidden)');
        if (noteElement) {
          const noteText = noteElement.querySelector('#note')?.textContent.trim();
          if (noteText) {
            markdown += `**Note:** ${noteText}\n\n`;
            
            // Add location if requested
            if (includeLocation && location) {
              markdown += `*Location: ${location}*\n\n`;
            }
            
            // Add separator between entries
            markdown += '---\n\n';
          }
        }
      }
    });
    
    return markdown;
  }
  
  /**
   * Download the markdown content as a file
   * @param {string} content - Markdown content
   */
  function downloadMarkdown(content) {
    // Get the book title for filename
    let bookTitle = document.querySelector('.kp-notebook-metadata.a-color-base')?.textContent.trim() || 'kindle-highlights';
    
    // Clean up the filename
    const filename = `${bookTitle.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-highlights.md`;
    
    // Instead of downloading directly, pass the content back to the popup
    return {
      content: content,
      filename: filename
    };
  }
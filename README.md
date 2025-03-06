# Kindle Highlights Exporter

A browser extension that extracts your Kindle highlights and notes from the [Amazon Kindle Notebook page](https://read.amazon.com/notebook) and converts them into a markdown file that you can use in your note-taking system.

## Features

- 🔍 Extracts highlights and notes from your Kindle Notebook
- 📄 Formats them neatly into a Markdown file
- 📌 Includes location information (optional)
- ⬇️ Downloads the file directly to your computer
- 🔒 Privacy-focused (all processing happens locally in your browser)

## Extension Versions

This repository contains two versions of the extension:
- `/chrome` - For Google Chrome and Chromium-based browsers (Edge, Brave, etc.)
- `/firefox` - For Mozilla Firefox

## Installation Instructions

### Chrome Installation

1. Download or clone this repository to your computer
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" using the toggle in the top-right corner
4. Click "Load unpacked" and select the `/chrome` folder from this repository
5. The extension should now appear in your Chrome toolbar

### Firefox Installation

1. Download or clone this repository to your computer
2. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on..."
4. Navigate to the `/firefox` folder and select the `manifest.json` file
5. The extension should now appear in your Firefox toolbar

Note: To install the extension permanently in Firefox, you'll need to submit it to the Firefox Add-ons store or have it signed by Mozilla. The temporary installation will work until you restart Firefox.

## Usage

1. Go to [Amazon Kindle Notebook](https://read.amazon.com/notebook)
2. Make sure you're signed in to your Amazon account
3. Click on the extension icon in your browser toolbar
4. Click the "Export Highlights" button
5. Choose where to save your markdown file
6. That's it! You now have all your highlights and notes in markdown format

## Extension Contents

### Chrome Version
- `manifest.json`: Extension configuration (Manifest V3)
- `popup.html`: User interface for the extension
- `popup.js`: User interface logic using Chrome APIs
- `content.js`: Script that extracts data from the Kindle Notebook page
- `styles.css`: Styling for the popup
- `icons/`: Extension icons

### Firefox Version
- `manifest.json`: Extension configuration (Manifest V2)
- `popup.html`: User interface for the extension
- `popup.js`: User interface logic using Firefox's Promise-based APIs
- `content.js`: Script that extracts data from the Kindle Notebook page
- `styles.css`: Styling for the popup
- `icons/`: Extension icons


## Troubleshooting

### Common Issues
- If no highlights appear, make sure you're logged into your Amazon account
- Ensure you're on the correct page: https://read.amazon.com/notebook
- Try refreshing the page before using the extension

### Chrome-specific Issues
- If the extension doesn't work, check the console (right-click on the popup and select "Inspect") for any error messages
- Make sure you have the latest version of Chrome

### Firefox-specific Issues
- If the extension stops working after a Firefox restart, you'll need to reload it (it's only loaded temporarily)
- If the "Export Highlights" button doesn't do anything, check the browser console for errors


## Privacy

This extension:
- Does not collect any data
- Does not send data to external servers
- Only accesses content on the Amazon Kindle Notebook page
- Only activates when you click the "Export Highlights" button

## License

MIT License
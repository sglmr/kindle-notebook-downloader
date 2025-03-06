# Kindle Highlights Exporter

A Chrome extension that extracts your Kindle highlights and notes from the Amazon Kindle Notebook page and converts them into a markdown file that you can use in your note-taking system.

## Features

- 🔍 Extracts highlights and notes from your Kindle Notebook
- 📄 Formats them neatly into a Markdown file
- 📌 Includes location information (optional)
- ⬇️ Downloads the file directly to your computer
- 🔒 Privacy-focused (all processing happens locally in your browser)

## Installation

### Option 1: Install From Source (Developer Mode)

1. Clone or download this repository to your computer
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" using the toggle in the top-right corner
4. Click "Load unpacked" and select the folder containing the extension files
5. The extension should now appear in your Chrome toolbar

### Option 2: Create a ZIP File for Distribution

1. Create a ZIP file containing all the extension files
2. Share the ZIP file with others, who can then extract it and follow the steps above to install

## Usage

1. Go to [Amazon Kindle Notebook](https://read.amazon.com/notebook)
2. Make sure you're signed in to your Amazon account
3. Click on the extension icon in your Chrome toolbar
4. Click the "Export Highlights" button
5. Choose where to save your markdown file
6. That's it! You now have all your highlights and notes in markdown format

## Extension Contents

- `manifest.json`: Extension configuration
- `popup.html` & `popup.js`: User interface for the extension
- `content.js`: Script that extracts data from the Kindle Notebook page
- `styles.css`: Styling for the popup
- `icons/`: Extension icons (you'll need to create these)

## Creating Icons

To complete this extension, you'll need to create icon files in the following sizes:
- 16x16 pixels (icon16.png)
- 48x48 pixels (icon48.png)
- 128x128 pixels (icon128.png)

Place these files in an `icons` folder.

## Customization

You can modify the markdown format by editing the `extractHighlights` function in `content.js`.

## Troubleshooting

- If no highlights appear, make sure you're logged into your Amazon account
- Ensure you're on the correct page: https://read.amazon.com/notebook
- Try refreshing the page before using the extension

## Privacy

This extension:
- Does not collect any data
- Does not send data to external servers
- Only accesses content on the Amazon Kindle Notebook page
- Only activates when you click the "Export Highlights" button

## License

MIT License
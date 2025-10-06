# SlideCapture Pro

**Extract all images from PowerPoint presentations with ease!**

SlideCapture Pro is a Chrome extension that allows users to extract all embedded images in their original quality from PowerPoint (.pptx) files and download them to their computer. Perfect for designers, content creators, and anyone who needs to extract images from presentations quickly and efficiently.

## 🚀 Features

- **Large File Support**: Handle PowerPoint files up to **500MB**
- **High-Quality Extraction**: Preserve original image quality and dimensions
- **Multiple Format Support**: Extract JPG, PNG, GIF, BMP, TIFF, SVG, WebP, EMF, and WMF images
- **Batch Download**: Select and download multiple images as a ZIP file
- **Side Panel Interface**: Clean, non-intrusive UI that works alongside your browser
- **Progress Tracking**: Real-time progress updates for large file processing
- **Smart Memory Management**: Optimized for handling large files efficiently

## 📸 Screenshots

![SlideCapture Pro Interface](https://via.placeholder.com/800x600?text=SlideCapture+Pro+Interface)

## 🛠️ Installation

### From Chrome Web Store
*Coming soon - Extension is pending approval*

### Manual Installation (Developer Mode)

1. **Download or Clone** this repository
2. **Open Chrome** and navigate to `chrome://extensions/`
3. **Enable Developer Mode** (toggle in top-right corner)
4. **Click "Load unpacked"** and select the extension folder
5. **Pin the extension** to your toolbar for easy access

## 📁 Project Structure

```
slideCapture-pro-extension/
├── manifest.json         # Extension configuration
├── index.html           # Main UI interface
├── app.js               # Core functionality
├── style.css            # UI styling
├── background.js        # Service worker
├── jszip.min.js         # ZIP creation library
└── icons/               # Extension icons
    ├── 16.png
    ├── 32.png
    ├── 48.png
    └── 128.png
```

## 🎯 How to Use

1. **Click the extension icon** in your Chrome toolbar
2. **Upload your .pptx file** (up to 500MB) via drag-and-drop or file selector
3. **Wait for processing** - larger files may take a few moments
4. **Review extracted images** in the preview grid
5. **Select images** you want to download (or select all)
6. **Download as ZIP** - images will be saved to your Downloads folder

## 🔧 Technical Details

### Performance Specifications
- **File Size Limit**: Up to 500MB PowerPoint presentations
- **Processing Speed**: 
  - Under 50MB: Near-instant processing
  - 50MB - 200MB: 5-15 seconds
  - 200MB - 500MB: 15-60 seconds (depends on image count)

### Browser Compatibility
- ✅ **Chrome** (Recommended): Handles up to 500MB efficiently
- ✅ **Edge**: Good performance with large files
- ⚠️ **Firefox**: May be slower with very large files (400MB+)
- ✅ **Safari**: Generally good performance

### Memory Optimization
- Progressive file processing to minimize memory usage
- Automatic cleanup of processed data
- Smart JSZip options for large files (CRC check skipping)
- Chunked processing for better stability

## 🛡️ Privacy & Security

- **No Data Collection**: Your files never leave your browser
- **Local Processing**: All extraction happens on your device
- **No Remote Code**: All libraries are bundled locally for security
- **Secure**: Compliant with Chrome's Content Security Policy

## ⚙️ Permissions

The extension requires these permissions:

- **`downloads`**: Save extracted images to your Downloads folder
- **`storage`**: Remember your preferences (no personal data collected)
- **`sidePanel`**: Display the extension interface in Chrome's side panel

## 🐛 Troubleshooting

### Large File Issues
- Ensure sufficient system RAM (8GB+ recommended for 300MB+ files)
- Close other browser tabs when processing very large files
- Allow extra processing time for presentations with many high-resolution images

### Extension Not Loading
1. Check if Developer Mode is enabled
2. Try reloading the extension in `chrome://extensions/`
3. Restart Chrome if necessary
4. Ensure all required files are present in the extension folder

### Processing Errors
- Verify the file is a valid .pptx format (not .ppt)
- Check that the file isn't corrupted
- Ensure the file contains embedded images
- Try with a smaller file first to test functionality

## 🔄 Version History

### v1.2 (Current)
- ✅ Increased file size limit to 500MB
- ✅ Enhanced performance for large files
- ✅ Improved progress tracking
- ✅ Better memory management
- ✅ Optimized user experience

### v1.1
- ✅ Added support for multiple image formats
- ✅ Improved error handling
- ✅ Enhanced UI/UX

### v1.0
- ✅ Initial release
- ✅ Basic PPTX image extraction
- ✅ 50MB file size limit

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests.

### Development Setup
1. Clone the repository
2. Make your changes
3. Test thoroughly with various file sizes
4. Submit a pull request with a clear description

### Testing Checklist
- [ ] Small file (under 10MB) - should work instantly
- [ ] Medium file (50-100MB) - should process smoothly  
- [ ] Large file (200-500MB) - should handle with progress updates
- [ ] UI shows "up to 500MB" in upload area
- [ ] Version shows "v1.2" in footer

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/slidecapture-pro/issues)
- **Email**: support@agapemedia.com
- **Website**: [Agape Media](https://agapemedia.com)

## 🏢 About Agape Media

SlideCapture Pro is developed by **Agape Media**, a digital marketing agency specializing in web development and innovative browser solutions.

---

**⭐ If you find SlideCapture Pro helpful, please consider starring this repository!**

Made with ❤️ by [Agape Media](https://agapemedia.com)
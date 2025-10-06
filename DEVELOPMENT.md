# Development Documentation

## 🏗️ Architecture Overview

SlideCapture Pro is built as a Chrome Manifest V3 extension with a clean separation of concerns:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Background    │    │   Side Panel    │    │   Core Logic    │
│   (Service      │    │   (UI Layer)    │    │   (Processing)  │
│   Worker)       │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
    Manages                 User Interface          File Processing
   Extension                 & Events              & Image Extraction
   Lifecycle
```

## 📁 File Structure

```
slidecapture-pro/
├── manifest.json         # Extension configuration & permissions
├── background.js         # Service worker for extension lifecycle
├── index.html           # Side panel UI structure
├── app.js               # Core application logic
├── style.css            # UI styling
├── jszip.min.js         # Third-party library for ZIP creation
├── icons/               # Extension icons (16px to 128px)
├── docs/                # Documentation files
└── .github/             # GitHub templates and workflows
```

## 🔧 Core Components

### 1. Background Service Worker (`background.js`)
**Purpose**: Manages extension lifecycle and side panel activation
```javascript
chrome.action.onClicked.addListener(async (tab) => {
  await chrome.sidePanel.open({ windowId: tab.windowId });
});
```

**Key Features**:
- Opens side panel when extension icon is clicked
- Minimal code for better performance
- Event-driven architecture

### 2. Main Application (`app.js`)
**Purpose**: Core functionality for file processing and image extraction

**Key Classes & Methods**:
```javascript
class SlideCapturePro {
  constructor()           // Initialize UI elements and event listeners
  handleFileSelect()      // Process uploaded files
  processPPTXFile()      // Extract images from PowerPoint files
  renderImages()         // Display extracted images in UI
  downloadSelectedImages() // Create and download ZIP file
}
```

**Architecture Patterns**:
- **Event-driven**: All user interactions trigger specific methods
- **Progressive processing**: Large files processed in chunks
- **Memory management**: Automatic cleanup of blob URLs
- **Error handling**: Graceful degradation with user feedback

### 3. User Interface (`index.html` + `style.css`)
**Purpose**: Responsive side panel interface

**UI Components**:
- **Upload area**: Drag-and-drop file selection
- **Progress bar**: Real-time processing feedback
- **Image grid**: Thumbnail preview with selection
- **Control buttons**: Select all/none, download actions
- **Error/success states**: User feedback system

## ⚡ Performance Optimizations

### Memory Management
```javascript
// Cleanup blob URLs to prevent memory leaks
this.extractedImages.forEach(image => {
  if (image.url) {
    URL.revokeObjectURL(image.url);
  }
});
```

### Large File Handling
```javascript
// Optimize JSZip for large files
const loadOptions = isLargeFile ? {
  checkCRC32: false,              // Skip CRC check for speed
  optimizedBinaryString: true     // Use optimized string handling
} : {};
```

### Progressive Processing
- **Chunked operations**: Process images in batches
- **Progress updates**: 5% → 25% → 50% → 95% → 100%
- **Memory cleanup**: Immediate cleanup after processing
- **Browser responsiveness**: Non-blocking operations

## 🔐 Security Implementation

### Content Security Policy
```json
{
  "content_security_policy": {
    "extension_pages": "script-src 'self'; object-src 'self'"
  }
}
```

### Local Processing Only
- **No network requests**: All processing happens locally
- **No data transmission**: Files never leave the browser
- **Bundled libraries**: JSZip included locally, not loaded from CDN
- **Minimal permissions**: Only essential Chrome APIs used

### Input Validation
```javascript
// File type validation
const validExtensions = ['.pptx'];
const hasValidExtension = validExtensions.some(ext => 
  fileName.endsWith(ext)
);

// File size validation (500MB limit)
const maxSize = 500 * 1024 * 1024;
if (file.size > maxSize) {
  this.showError(`File size exceeds 500MB limit`);
  return;
}
```

## 🧪 Testing Strategy

### Manual Testing Checklist
- [ ] **Small files** (< 10MB): Instant processing
- [ ] **Medium files** (50-100MB): Smooth processing with progress
- [ ] **Large files** (200-500MB): Handles with appropriate warnings
- [ ] **Invalid files**: Proper error messages
- [ ] **Empty files**: Graceful handling
- [ ] **Corrupted files**: Error detection and reporting
- [ ] **Memory usage**: No excessive RAM consumption
- [ ] **UI responsiveness**: No freezing during processing

### Browser Compatibility Testing
- **Chrome** (primary): Full feature support
- **Edge**: Chromium-based compatibility
- **Firefox**: Limited testing (different extension API)
- **Safari**: Not supported (different extension architecture)

### Performance Benchmarks
```
File Size    | Processing Time | Memory Usage
-------------|----------------|-------------
10MB         | < 1 second     | ~50MB
50MB         | 2-5 seconds    | ~150MB
100MB        | 5-15 seconds   | ~300MB
300MB        | 30-60 seconds  | ~800MB
500MB        | 60-120 seconds | ~1.2GB
```

## 🔄 Development Workflow

### Local Development
1. **Clone repository**
   ```bash
   git clone https://github.com/yourusername/slidecapture-pro.git
   cd slidecapture-pro
   ```

2. **Load in Chrome**
   - Go to `chrome://extensions/`
   - Enable Developer mode
   - Click "Load unpacked"
   - Select project folder

3. **Development cycle**
   - Make changes to code
   - Click "Reload" in extensions page
   - Test changes
   - Repeat

### Debugging
```javascript
// Enable detailed logging
console.log('Processing file:', {
  name: file.name,
  size: file.size,
  type: file.type
});

// Monitor memory usage
console.log('Memory usage:', performance.memory);

// Track processing time
const startTime = performance.now();
// ... processing code ...
const endTime = performance.now();
console.log(`Processing took ${endTime - startTime} milliseconds`);
```

### Code Quality Standards
- **ES6+ syntax**: Modern JavaScript features
- **Consistent naming**: camelCase for variables, PascalCase for classes
- **Error handling**: Try-catch blocks for all async operations
- **Documentation**: Comments for complex logic
- **Performance**: Optimize for large file handling

## 📊 Data Flow

```
User Action → File Selection → Validation → Processing → Display → Download

1. User selects .pptx file
2. File validation (size, type, integrity)
3. ZIP extraction using JSZip
4. Image detection and processing
5. Blob creation for preview
6. UI rendering with thumbnails
7. User selection of images
8. ZIP creation for download
9. Browser download initiation
```

## 🚀 Deployment

### Chrome Web Store Preparation
1. **Version bump** in `manifest.json`
2. **Test thoroughly** across different scenarios
3. **Update documentation** (README, CHANGELOG)
4. **Create release package** (ZIP file)
5. **Submit for review** via Chrome Web Store Developer Dashboard

### Release Checklist
- [ ] All tests pass
- [ ] Documentation updated
- [ ] Version number incremented
- [ ] CHANGELOG updated
- [ ] No console errors
- [ ] Performance acceptable
- [ ] Security review completed

## 🔮 Future Enhancements

### Planned Features
- **PDF support**: Extract images from PDF presentations
- **Batch processing**: Handle multiple files simultaneously
- **Cloud integration**: Direct upload to Google Drive/Dropbox
- **Image editing**: Basic crop, resize, format conversion
- **OCR capabilities**: Extract text from images

### Technical Improvements
- **WebAssembly**: Faster image processing
- **Web Workers**: Better performance for large files
- **IndexedDB**: Persistent storage for user preferences
- **Service Worker caching**: Improved offline capabilities

## 📞 Support & Maintenance

### Common Issues
1. **Memory errors**: Usually with files > 400MB on systems with < 8GB RAM
2. **Processing slowness**: Expected with files containing many high-res images
3. **File corruption**: Rare, usually indicates source file issues

### Monitoring
- **User reports**: GitHub Issues for bug tracking
- **Performance metrics**: Manual testing with various file sizes
- **Browser updates**: Regular compatibility testing

---

This documentation is maintained alongside the codebase. For questions or clarifications, please create an issue on GitHub.
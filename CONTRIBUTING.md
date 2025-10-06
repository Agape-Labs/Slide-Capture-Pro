# Contributing to SlideCapture Pro

Thank you for your interest in contributing to SlideCapture Pro! We welcome contributions from the community.

## 🚀 Getting Started

### Prerequisites
- Chrome browser (latest version recommended)
- Basic knowledge of HTML, CSS, and JavaScript
- Familiarity with Chrome extension development

### Development Setup

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/slidecapture-pro.git
   cd slidecapture-pro
   ```

2. **Load the extension in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the project folder

3. **Make your changes**
   - Edit the relevant files
   - Test your changes thoroughly

4. **Test the extension**
   - Use various file sizes (small, medium, large)
   - Test error handling scenarios
   - Verify UI/UX improvements

## 🐛 Reporting Issues

When reporting issues, please include:

- **Chrome version**
- **Operating system**
- **File size and type** you were trying to process
- **Steps to reproduce** the issue
- **Expected vs actual behavior**
- **Console errors** (if any)

## 💡 Feature Requests

We love hearing new ideas! When submitting feature requests:

- **Describe the feature** clearly
- **Explain the use case** - how would this help users?
- **Consider implementation** - is this technically feasible?

## 🔧 Development Guidelines

### File Structure
- Keep the existing file structure intact
- Add new files only when necessary
- Update documentation for any structural changes

### Code Style
- Use consistent indentation (2 spaces)
- Add comments for complex logic
- Follow existing naming conventions
- Keep functions focused and small

### Testing
Before submitting a pull request, ensure:

- [ ] **Small files** (under 10MB) process instantly
- [ ] **Medium files** (50-100MB) process smoothly
- [ ] **Large files** (200-500MB) handle with progress updates
- [ ] **Error handling** works for invalid files
- [ ] **UI remains responsive** during processing
- [ ] **Memory usage** is reasonable
- [ ] **No console errors** in normal operation

### Performance Considerations
- Test with various file sizes
- Monitor memory usage during development
- Ensure the extension doesn't slow down the browser
- Optimize for large file handling

## 📋 Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, commented code
   - Follow existing code patterns
   - Update documentation if needed

3. **Test thoroughly**
   - Run through the testing checklist above
   - Test on different file sizes
   - Verify no regressions

4. **Submit the pull request**
   - Use a clear title and description
   - Reference any related issues
   - Include screenshots if UI changes are involved

5. **Address feedback**
   - Respond to review comments
   - Make requested changes
   - Re-test after modifications

## 🎯 Priority Areas for Contribution

We especially welcome contributions in these areas:

### 🔧 **Technical Improvements**
- Performance optimizations for very large files
- Memory usage reduction
- Browser compatibility improvements
- Error handling enhancements

### 🎨 **UI/UX Enhancements**
- Better progress indicators
- Improved accessibility
- Mobile-responsive design
- Dark mode support

### 📚 **Documentation**
- Code documentation improvements
- User guide enhancements
- Troubleshooting guides
- API documentation

### 🧪 **Testing**
- Unit tests for core functions
- Integration tests
- Performance benchmarks
- Cross-browser testing

## 📝 Code Examples

### Adding a New Image Format
```javascript
// In app.js, update the supportedFormats array
const supportedFormats = [
  'jpg', 'jpeg', 'png', 'gif', 'bmp', 
  'tiff', 'svg', 'webp', 'emf', 'wmf',
  'your-new-format' // Add here
];
```

### Adding Progress Updates
```javascript
// Use the updateProgress method
this.updateProgress(percentage, 'Your progress message...');
```

### Error Handling
```javascript
// Always wrap risky operations in try-catch
try {
  // Your code here
} catch (error) {
  console.error('Operation failed:', error);
  this.showError(`Operation failed: ${error.message}`);
}
```

## 🏅 Recognition

Contributors will be acknowledged in:
- README.md file
- Release notes
- Chrome Web Store listing (when published)

## 📞 Getting Help

If you need help contributing:

- **GitHub Issues**: Ask questions using the "question" label
- **Email**: developer@agapemedia.com
- **Documentation**: Check existing code comments and README

## 🔒 Security

If you discover security vulnerabilities:

- **DO NOT** open a public issue
- **Email** security@agapemedia.com
- **Include** steps to reproduce
- **Wait** for confirmation before disclosure

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for helping make SlideCapture Pro better! 🚀**
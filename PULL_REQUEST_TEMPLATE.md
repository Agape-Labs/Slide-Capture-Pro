# Pull Request Template

## 📋 Description

**What does this PR do?**
Provide a brief description of the changes in this pull request.

**Related Issue(s)**
- Fixes #[issue number]
- Closes #[issue number]
- Related to #[issue number]

## 🔄 Type of Change

Please check the relevant option(s):

- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ New feature (non-breaking change which adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 📚 Documentation update
- [ ] 🔧 Code refactoring (no functional changes)
- [ ] ⚡ Performance improvement
- [ ] 🧪 Test addition or update
- [ ] 🎨 UI/UX improvement

## 🧪 Testing

**Test Environment:**
- OS: [e.g., Windows 11]
- Browser: [e.g., Chrome 118]
- Extension loaded via: [e.g., Developer mode]

**Testing Performed:**
- [ ] Small files (under 10MB) - works instantly
- [ ] Medium files (50-100MB) - processes smoothly
- [ ] Large files (200-500MB) - handles with progress updates
- [ ] Error handling for invalid files
- [ ] UI remains responsive during processing
- [ ] No console errors in normal operation
- [ ] Memory usage is reasonable
- [ ] All existing features still work

**Specific Test Cases:**
Describe any specific test cases you ran for this change:

1. [Test case 1]
2. [Test case 2]
3. [Test case 3]

## 📸 Screenshots

**Before (if applicable):**
[Insert screenshots of the current behavior]

**After:**
[Insert screenshots of the new behavior]

## 🔧 Technical Details

**Files Changed:**
- [ ] `manifest.json` - [describe changes]
- [ ] `app.js` - [describe changes]
- [ ] `index.html` - [describe changes]
- [ ] `style.css` - [describe changes]
- [ ] `background.js` - [describe changes]
- [ ] Other: [specify files and changes]

**Implementation Notes:**
Describe any technical implementation details, architectural decisions, or considerations for reviewers.

**Performance Impact:**
- [ ] No performance impact
- [ ] Improves performance
- [ ] May impact performance (explain below)

**Browser Compatibility:**
- [ ] Tested on Chrome
- [ ] Tested on Edge
- [ ] Tested on Firefox (if applicable)
- [ ] No browser-specific code added

## 📚 Documentation

- [ ] Code is commented where necessary
- [ ] README updated (if needed)
- [ ] CHANGELOG updated
- [ ] No documentation changes needed

## ✅ Checklist

**Code Quality:**
- [ ] Code follows the existing style and conventions
- [ ] Functions are focused and not overly complex
- [ ] Error handling is appropriate
- [ ] Console logs are removed or appropriate for production
- [ ] No hardcoded values where configuration is more appropriate

**Testing:**
- [ ] All tests pass
- [ ] New functionality is tested
- [ ] Edge cases are considered
- [ ] Error scenarios are tested
- [ ] Performance tested with various file sizes

**Security:**
- [ ] No security vulnerabilities introduced
- [ ] Input validation is appropriate
- [ ] No sensitive data exposed
- [ ] Follows Chrome extension security best practices

**Review:**
- [ ] Self-review completed
- [ ] Code is ready for review
- [ ] PR description is clear and complete

## 🤔 Questions for Reviewers

**Specific areas to focus on:**
- [Area 1 you'd like reviewers to pay special attention to]
- [Area 2 you're unsure about and want feedback on]
- [Any specific concerns or questions you have]

**Alternative approaches considered:**
[If you considered other ways to implement this, mention them and why you chose the current approach]

## 📝 Additional Notes

**Breaking Changes:**
[If this is a breaking change, describe what breaks and how users should adapt]

**Migration Guide:**
[If users need to take any action to use the new version, describe it here]

**Known Issues:**
[Any known issues or limitations with this implementation]

**Future Work:**
[Any follow-up work that should be done in future PRs]

---

**By submitting this PR, I confirm that:**
- [ ] I have read and followed the [Contributing Guidelines](CONTRIBUTING.md)
- [ ] I have tested my changes thoroughly
- [ ] I understand this will be reviewed before merging
- [ ] I am willing to make changes based on review feedback
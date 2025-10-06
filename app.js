class SlideCapturePro {
    constructor() {
        this.selectedFile = null;
        this.extractedImages = [];
        this.selectedImages = new Set();

        this.initializeElements();
        this.setupEventListeners();
    }

    initializeElements() {
        // Upload elements
        this.uploadArea = document.getElementById('uploadArea');
        this.selectFileBtn = document.getElementById('selectFileBtn');
        this.fileInput = document.getElementById('fileInput');
        this.selectedFileDiv = document.getElementById('selectedFile');
        this.fileName = document.getElementById('fileName');
        this.fileSize = document.getElementById('fileSize');
        this.removeFileBtn = document.getElementById('removeFile');

        // Processing elements
        this.processingSection = document.getElementById('processingSection');
        this.progressFill = document.getElementById('progressFill');
        this.processingText = document.getElementById('processingText');

        // Images elements
        this.imagesSection = document.getElementById('imagesSection');
        this.imageCount = document.getElementById('imageCount');
        this.imagesGrid = document.getElementById('imagesGrid');
        this.selectAllBtn = document.getElementById('selectAll');
        this.selectNoneBtn = document.getElementById('selectNone');
        this.downloadBtn = document.getElementById('downloadSelected');

        // Error/Success elements
        this.errorSection = document.getElementById('errorSection');
        this.errorText = document.getElementById('errorText');
        this.tryAgainBtn = document.getElementById('tryAgain');
        this.successSection = document.getElementById('successSection');
        this.successText = document.getElementById('successText');
    }

    setupEventListeners() {
        // File upload - Fixed: Properly bind the file input click
        if (this.selectFileBtn && this.fileInput) {
            this.selectFileBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Select file button clicked');
                this.fileInput.click();
            });

            this.fileInput.addEventListener('change', (e) => {
                console.log('File input changed:', e.target.files);
                if (e.target.files && e.target.files[0]) {
                    this.handleFileSelect(e.target.files[0]);
                }
            });
        }

        if (this.removeFileBtn) {
            this.removeFileBtn.addEventListener('click', () => this.removeFile());
        }

        // Drag and drop - Fixed: Better event handling
        if (this.uploadArea) {
            this.uploadArea.addEventListener('dragover', (e) => this.handleDragOver(e));
            this.uploadArea.addEventListener('dragleave', (e) => this.handleDragLeave(e));
            this.uploadArea.addEventListener('drop', (e) => this.handleDrop(e));

            // Prevent default drag behavior on the entire document
            document.addEventListener('dragover', (e) => e.preventDefault());
            document.addEventListener('drop', (e) => e.preventDefault());
        }

        // Image selection
        if (this.selectAllBtn) {
            this.selectAllBtn.addEventListener('click', () => this.selectAllImages());
        }
        if (this.selectNoneBtn) {
            this.selectNoneBtn.addEventListener('click', () => this.selectNoneImages());
        }

        // Download
        if (this.downloadBtn) {
            this.downloadBtn.addEventListener('click', () => this.downloadSelectedImages());
        }

        // Error handling
        if (this.tryAgainBtn) {
            this.tryAgainBtn.addEventListener('click', () => this.resetToUpload());
        }

        console.log('Event listeners set up successfully');
    }

    handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        this.uploadArea.classList.add('dragover');
    }

    handleDragLeave(e) {
        e.preventDefault();
        e.stopPropagation();
        // Only remove dragover if we're leaving the upload area completely
        if (!this.uploadArea.contains(e.relatedTarget)) {
            this.uploadArea.classList.remove('dragover');
        }
    }

    handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        this.uploadArea.classList.remove('dragover');

        const files = e.dataTransfer.files;
        console.log('Files dropped:', files);

        if (files.length > 0) {
            this.handleFileSelect(files[0]);
        }
    }

    handleFileSelect(file) {
        if (!file) {
            console.log('No file provided');
            return;
        }

        console.log('File selected:', {
            name: file.name,
            type: file.type,
            size: file.size
        });

        // File validation
        const fileName = file.name.toLowerCase();
        const validExtensions = ['.pptx', '.ppt'];
        const hasValidExtension = validExtensions.some(ext => fileName.endsWith(ext));

        // For PPTX files, also check common MIME types
        const validMimeTypes = [
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'application/vnd.ms-powerpoint',
            'application/mspowerpoint',
            'application/powerpoint',
            'application/x-mspowerpoint',
            ''  // Sometimes drag-dropped files have empty MIME type
        ];

        const hasSupportedMimeType = validMimeTypes.includes(file.type) || file.type === '';

        // Accept file if it has valid extension OR valid MIME type
        if (!hasValidExtension && !hasSupportedMimeType) {
            console.log('Invalid file type:', file.type, 'Extension:', fileName);
            this.showError('Please select a valid PowerPoint file (.pptx or .ppt)');
            return;
        }

        // Additional check: if extension is .ppt, warn about limited support
        if (fileName.endsWith('.ppt') && !fileName.endsWith('.pptx')) {
            this.showError('PPT files are not currently supported. Please convert to PPTX format and try again.');
            return;
        }

        // UPDATED: Enhanced file size validation (500MB limit)
        const maxSize = 500 * 1024 * 1024; // 500MB in bytes
        if (file.size > maxSize) {
            this.showError(`File size (${this.formatFileSize(file.size)}) exceeds the 500MB limit. Please use a smaller file.`);
            return;
        }

        if (file.size === 0) {
            this.showError('The selected file appears to be empty');
            return;
        }

        // Additional check for very large files - warn user about processing time
        const largeFileThreshold = 100 * 1024 * 1024; // 100MB
        if (file.size > largeFileThreshold) {
            console.log(`Large file detected: ${this.formatFileSize(file.size)}. Processing may take longer.`);
        }

        console.log('File validation passed');
        this.selectedFile = file;
        this.showSelectedFile();
        this.processFile();
    }

    showSelectedFile() {
        if (this.selectedFile && this.fileName && this.fileSize) {
            this.fileName.textContent = this.selectedFile.name;
            this.fileSize.textContent = this.formatFileSize(this.selectedFile.size);

            if (this.uploadArea) this.uploadArea.style.display = 'none';
            if (this.selectedFileDiv) this.selectedFileDiv.style.display = 'block';
        }
    }

    removeFile() {
        this.selectedFile = null;
        // Clean up blob URLs to free memory
        this.extractedImages.forEach(image => {
            if (image.url) {
                URL.revokeObjectURL(image.url);
            }
        });
        this.extractedImages = [];
        this.selectedImages.clear();

        if (this.selectedFileDiv) this.selectedFileDiv.style.display = 'none';
        if (this.uploadArea) this.uploadArea.style.display = 'block';
        if (this.fileInput) this.fileInput.value = '';

        this.hideAllSections();
    }

    async processFile() {
        if (!this.selectedFile) {
            console.log('No file to process');
            return;
        }

        console.log('Starting file processing...');
        this.showProcessing();

        try {
            // Enhanced check for PPTX files
            const fileName = this.selectedFile.name.toLowerCase();
            if (fileName.endsWith('.pptx')) {
                await this.processPPTXFile();
            } else if (fileName.endsWith('.ppt')) {
                this.showError('PPT files are not currently supported. Please save your presentation as PPTX format and try again.');
                return;
            } else {
                this.showError('Unsupported file format. Please select a .pptx file.');
                return;
            }
        } catch (error) {
            console.error('Error processing file:', error);
            this.showError(`Failed to process the file: ${error.message}`);
        }
    }

    async processPPTXFile() {
        try {
            this.updateProgress(5, 'Reading file...');

            // For large files, show appropriate progress updates
            const isLargeFile = this.selectedFile.size > 100 * 1024 * 1024; // 100MB+

            if (isLargeFile) {
                this.updateProgress(10, 'Processing large file... This may take a moment.');
            }

            const arrayBuffer = await this.selectedFile.arrayBuffer();
            console.log('File read, size:', arrayBuffer.byteLength);

            this.updateProgress(25, 'Extracting presentation data...');

            // Enhanced JSZip loading with error handling and options for large files
            let zip;
            try {
                // For large files, use different JSZip options
                const loadOptions = isLargeFile ? {
                    checkCRC32: false, // Skip CRC check for faster processing
                    optimizedBinaryString: true
                } : {};

                zip = await JSZip.loadAsync(arrayBuffer, loadOptions);
                console.log('ZIP loaded successfully');
            } catch (zipError) {
                console.error('ZIP loading failed:', zipError);
                throw new Error('This file does not appear to be a valid PPTX file or may be corrupted');
            }

            this.updateProgress(40, 'Looking for images...');

            const images = [];
            const mediaFolder = 'ppt/media/';

            // Enhanced image detection
            console.log('ZIP contents:', Object.keys(zip.files));

            Object.keys(zip.files).forEach(fileName => {
                if (fileName.startsWith(mediaFolder) && !zip.files[fileName].dir) {
                    const extension = fileName.split('.').pop().toLowerCase();
                    const supportedFormats = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'svg', 'webp', 'emf', 'wmf'];

                    if (supportedFormats.includes(extension)) {
                        console.log('Found image:', fileName);
                        images.push({
                            fileName: fileName.replace(mediaFolder, ''),
                            fullPath: fileName,
                            extension: extension,
                            zipFile: zip.files[fileName]
                        });
                    }
                }
            });

            console.log(`Found ${images.length} images`);

            this.updateProgress(50, 'Processing images...');

            if (images.length === 0) {
                this.showError('No images found in this presentation. The PowerPoint file might not contain any embedded images.');
                return;
            }

            // Process each image with better error handling and progress updates
            const totalImages = images.length;
            for (let i = 0; i < images.length; i++) {
                const image = images[i];
                const progressPercent = 50 + (i / totalImages) * 45; // From 50% to 95%
                this.updateProgress(progressPercent, `Processing image ${i + 1} of ${totalImages}...`);

                try {
                    const blob = await image.zipFile.async('blob');
                    const url = URL.createObjectURL(blob);

                    // Get image dimensions and size
                    const dimensions = await this.getImageDimensions(url);

                    this.extractedImages.push({
                        ...image,
                        blob: blob,
                        url: url,
                        size: blob.size,
                        dimensions: dimensions
                    });

                    console.log(`Processed image ${i + 1}: ${image.fileName}`);
                } catch (imageError) {
                    console.error(`Error processing image ${image.fileName}:`, imageError);
                    // Continue with other images even if one fails
                }
            }

            this.updateProgress(100, 'Complete!');
            console.log(`Successfully processed ${this.extractedImages.length} images`);

            setTimeout(() => {
                this.showImages();
            }, 500);

        } catch (error) {
            console.error('PPTX processing error:', error);
            throw error;
        }
    }

    getImageDimensions(url) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                resolve({
                    width: img.naturalWidth,
                    height: img.naturalHeight
                });
            };
            img.onerror = () => {
                console.warn('Failed to load image for dimensions:', url);
                resolve({ width: 0, height: 0 });
            };
            img.src = url;
        });
    }

    showProcessing() {
        this.hideAllSections();
        if (this.processingSection) {
            this.processingSection.style.display = 'block';
        }
        this.updateProgress(0, 'Starting...');
    }

    updateProgress(percentage, text) {
        if (this.progressFill) {
            this.progressFill.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
        }
        if (this.processingText) {
            this.processingText.textContent = text;
        }
    }

    showImages() {
        this.hideAllSections();
        if (this.imagesSection) {
            this.imagesSection.style.display = 'block';
        }
        if (this.imageCount) {
            this.imageCount.textContent = this.extractedImages.length;
        }
        this.renderImages();
        this.updateDownloadButton();
    }

    renderImages() {
        if (!this.imagesGrid) return;

        this.imagesGrid.innerHTML = '';

        this.extractedImages.forEach((image, index) => {
            const imageItem = document.createElement('div');
            imageItem.className = 'image-item';
            imageItem.innerHTML = `
                <div class="image-preview">
                    <img src="${image.url}" alt="${image.fileName}" loading="lazy">
                </div>
                <div class="image-info">
                    <h4>${image.fileName}</h4>
                    <p>${this.formatFileSize(image.size)} • ${image.dimensions.width}×${image.dimensions.height}</p>
                </div>
                <div class="image-checkbox">
                    <input type="checkbox" id="image-${index}" data-index="${index}">
                    <label for="image-${index}">Select</label>
                </div>
            `;

            // Add click handler for the entire item
            imageItem.addEventListener('click', (e) => {
                if (e.target.type !== 'checkbox') {
                    const checkbox = imageItem.querySelector('input[type="checkbox"]');
                    checkbox.checked = !checkbox.checked;
                    this.handleImageSelection(checkbox);
                }
            });

            // Add change handler for checkbox
            const checkbox = imageItem.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', (e) => this.handleImageSelection(e.target));

            this.imagesGrid.appendChild(imageItem);
        });
    }

    handleImageSelection(checkbox) {
        const index = parseInt(checkbox.dataset.index);
        const imageItem = checkbox.closest('.image-item');

        if (checkbox.checked) {
            this.selectedImages.add(index);
            imageItem.classList.add('selected');
        } else {
            this.selectedImages.delete(index);
            imageItem.classList.remove('selected');
        }

        this.updateDownloadButton();
    }

    selectAllImages() {
        const checkboxes = this.imagesGrid.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = true;
            this.handleImageSelection(checkbox);
        });
    }

    selectNoneImages() {
        const checkboxes = this.imagesGrid.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
            this.handleImageSelection(checkbox);
        });
    }

    updateDownloadButton() {
        if (this.downloadBtn) {
            const hasSelection = this.selectedImages.size > 0;
            this.downloadBtn.disabled = !hasSelection;
            this.downloadBtn.textContent = hasSelection 
                ? `Download Selected (${this.selectedImages.size})` 
                : 'Download Selected';
        }
    }

    async downloadSelectedImages() {
        if (this.selectedImages.size === 0) {
            this.showError('Please select at least one image to download');
            return;
        }

        try {
            // Show progress for large downloads
            const selectedArray = Array.from(this.selectedImages);
            const isLargeDownload = selectedArray.length > 50 || 
                selectedArray.some(index => this.extractedImages[index].size > 5 * 1024 * 1024); // 5MB+

            if (isLargeDownload) {
                this.updateProgress(0, 'Preparing download... This may take a moment.');
                this.showProcessing();
            }

            // Create a new ZIP file for download
            const zip = new JSZip();

            for (const index of selectedArray) {
                const image = this.extractedImages[index];
                if (image && image.blob) {
                    zip.file(image.fileName, image.blob);
                }
            }

            // Generate ZIP file with compression for large files
            const zipOptions = {
                type: 'blob',
                compression: selectedArray.length > 10 ? 'DEFLATE' : 'STORE',
                compressionOptions: {
                    level: 6
                }
            };

            const zipBlob = await zip.generateAsync(zipOptions);

            // Create download link
            const url = URL.createObjectURL(zipBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `SlideCapture_Pro_Images_${new Date().getTime()}.zip`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            this.showSuccess(`Successfully downloaded ${selectedArray.length} images!`);

        } catch (error) {
            console.error('Download error:', error);
            this.showError('Failed to download images. Please try again.');
        }
    }

    showError(message) {
        this.hideAllSections();
        if (this.errorSection && this.errorText) {
            this.errorText.textContent = message;
            this.errorSection.style.display = 'block';
        }
        console.error('Error:', message);
    }

    showSuccess(message) {
        this.hideAllSections();
        if (this.successSection && this.successText) {
            this.successText.textContent = message;
            this.successSection.style.display = 'block';
        }
        console.log('Success:', message);
    }

    resetToUpload() {
        this.removeFile();
        this.hideAllSections();
        if (this.uploadArea) {
            this.uploadArea.style.display = 'block';
        }
    }

    hideAllSections() {
        const sections = [
            this.processingSection,
            this.imagesSection,
            this.errorSection,
            this.successSection
        ];

        sections.forEach(section => {
            if (section) section.style.display = 'none';
        });
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Enhanced cleanup for memory management with large files
    cleanup() {
        this.extractedImages.forEach(image => {
            if (image.url) {
                URL.revokeObjectURL(image.url);
            }
        });
        this.extractedImages = [];
        this.selectedImages.clear();
    }
}

// Single initialization to prevent double event listeners
let slideCapturePro = null;

function initializeSlideCapturePro() {
    if (slideCapturePro) {
        console.log('SlideCapture Pro already initialized');
        return;
    }

    console.log('Initializing SlideCapture Pro...');
    try {
        slideCapturePro = new SlideCapturePro();
        console.log('SlideCapture Pro initialized successfully');
    } catch (error) {
        console.error('Failed to initialize SlideCapture Pro:', error);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSlideCapturePro);
} else {
    initializeSlideCapturePro();
}
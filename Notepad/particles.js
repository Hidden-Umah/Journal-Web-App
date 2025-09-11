class WordPad {
    constructor() {
        this.editor = document.getElementById('editor');
        this.fileName = 'Untitled Document';
        this.isModified = false;
        this.currentAlignment = 'left';
        
        this.initializeElements();
        this.setupEventListeners();
        this.updateStats();
        this.startAutoSave();
    }

    initializeElements() {
        // Get all DOM elements
        this.elements = {
            fileName: document.getElementById('fileName'),
            wordCount: document.getElementById('wordCount'),
            charCount: document.getElementById('charCount'),
            lineCount: document.getElementById('lineCount'),
            lastSaved: document.getElementById('lastSaved'),
            
            // Buttons
            newBtn: document.getElementById('newBtn'),
            openBtn: document.getElementById('openBtn'),
            saveBtn: document.getElementById('saveBtn'),
            boldBtn: document.getElementById('boldBtn'),
            italicBtn: document.getElementById('italicBtn'),
            underlineBtn: document.getElementById('underlineBtn'),
            alignLeftBtn: document.getElementById('alignLeftBtn'),
            alignCenterBtn: document.getElementById('alignCenterBtn'),
            alignRightBtn: document.getElementById('alignRightBtn'),
            insertDateBtn: document.getElementById('insertDateBtn'),
            clearBtn: document.getElementById('clearBtn'),
            
            // Selects and inputs
            fontFamily: document.getElementById('fontFamily'),
            fontSize: document.getElementById('fontSize'),
            textColor: document.getElementById('textColor'),
            fileInput: document.getElementById('fileInput')
        };
    }

    setupEventListeners() {
        // File operations
        this.elements.newBtn.addEventListener('click', () => this.newDocument());
        this.elements.openBtn.addEventListener('click', () => this.openDocument());
        this.elements.saveBtn.addEventListener('click', () => this.saveDocument());
        this.elements.fileInput.addEventListener('change', (e) => this.handleFileOpen(e));

        // Formatting
        this.elements.fontFamily.addEventListener('change', () => this.changeFontFamily());
        this.elements.fontSize.addEventListener('change', () => this.changeFontSize());
        this.elements.textColor.addEventListener('change', () => this.changeTextColor());

        // Text formatting buttons
        this.elements.boldBtn.addEventListener('click', () => this.toggleFormat('bold'));
        this.elements.italicBtn.addEventListener('click', () => this.toggleFormat('italic'));
        this.elements.underlineBtn.addEventListener('click', () => this.toggleFormat('underline'));

        // Alignment buttons
        this.elements.alignLeftBtn.addEventListener('click', () => this.setAlignment('left'));
        this.elements.alignCenterBtn.addEventListener('click', () => this.setAlignment('center'));
        this.elements.alignRightBtn.addEventListener('click', () => this.setAlignment('right'));

        // Other functions
        this.elements.insertDateBtn.addEventListener('click', () => this.insertDate());
        this.elements.clearBtn.addEventListener('click', () => this.clearDocument());

        // Editor events
        this.editor.addEventListener('input', () => this.handleEditorChange());
        this.editor.addEventListener('keyup', () => this.updateStats());
        this.editor.addEventListener('paste', () => {
            setTimeout(() => this.updateStats(), 100);
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));

        // Update formatting button states when cursor moves
        this.editor.addEventListener('mouseup', () => this.updateFormatButtons());
        this.editor.addEventListener('keyup', () => this.updateFormatButtons());
    }

    handleEditorChange() {
        this.isModified = true;
        this.updateFileName();
        this.updateStats();
    }

    newDocument() {
        if (this.isModified && !confirm('You have unsaved changes. Are you sure you want to create a new document?')) {
            return;
        }
        
        this.editor.innerHTML = '<p>Start typing your document here...</p>';
        this.fileName = 'Untitled Document';
        this.isModified = false;
        this.updateFileName();
        this.updateStats();
        this.editor.focus();
    }

    openDocument() {
        if (this.isModified && !confirm('You have unsaved changes. Are you sure you want to open another document?')) {
            return;
        }
        this.elements.fileInput.click();
    }

    handleFileOpen(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            
            if (file.type === 'text/html' || file.name.endsWith('.html')) {
                this.editor.innerHTML = content;
            } else {
                // Plain text file
                this.editor.innerHTML = '<p>' + content.replace(/\n/g, '</p><p>') + '</p>';
            }
            
            this.fileName = file.name;
            this.isModified = false;
            this.updateFileName();
            this.updateStats();
        };
        
        reader.readAsText(file);
        event.target.value = ''; // Reset file input
    }

    saveDocument() {
        const content = this.editor.innerHTML;
        const blob = new Blob([content], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = this.fileName.endsWith('.html') ? this.fileName : this.fileName + '.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.isModified = false;
        this.updateFileName();
        this.elements.lastSaved.textContent = `Saved at ${new Date().toLocaleTimeString()}`;
    }

    changeFontFamily() {
        const fontFamily = this.elements.fontFamily.value;
        document.execCommand('fontName', false, fontFamily);
        this.editor.focus();
    }

    changeFontSize() {
        const fontSize = this.elements.fontSize.value;
        document.execCommand('fontSize', false, '3');
        
        // Apply the actual size to selected text
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            if (!range.collapsed) {
                const span = document.createElement('span');
                span.style.fontSize = fontSize;
                try {
                    range.surroundContents(span);
                } catch (e) {
                    // Handle cases where range spans multiple elements
                    span.appendChild(range.extractContents());
                    range.insertNode(span);
                }
            }
        }
        this.editor.focus();
    }

    changeTextColor() {
        const color = this.elements.textColor.value;
        document.execCommand('foreColor', false, color);
        this.editor.focus();
    }

    toggleFormat(command) {
        document.execCommand(command, false, null);
        this.updateFormatButtons();
        this.editor.focus();
    }

    setAlignment(alignment) {
        // Remove active class from all alignment buttons
        document.querySelectorAll('.align-btn').forEach(btn => btn.classList.remove('active'));
        
        // Add active class to current button
        this.elements[`align${alignment.charAt(0).toUpperCase() + alignment.slice(1)}Btn`].classList.add('active');
        
        // Apply alignment
        if (alignment === 'left') {
            document.execCommand('justifyLeft', false, null);
        } else if (alignment === 'center') {
            document.execCommand('justifyCenter', false, null);
        } else if (alignment === 'right') {
            document.execCommand('justifyRight', false, null);
        }
        
        this.currentAlignment = alignment;
        this.editor.focus();
    }

    insertDate() {
        const now = new Date();
        const dateString = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
        document.execCommand('insertText', false, dateString);
        this.editor.focus();
    }

    clearDocument() {
        if (confirm('Are you sure you want to clear all content?')) {
            this.editor.innerHTML = '<p><br></p>';
            this.isModified = true;
            this.updateFileName();
            this.updateStats();
            this.editor.focus();
        }
    }

    updateFormatButtons() {
        // Update format button states based on current selection
        this.elements.boldBtn.classList.toggle('active', document.queryCommandState('bold'));
        this.elements.italicBtn.classList.toggle('active', document.queryCommandState('italic'));
        this.elements.underlineBtn.classList.toggle('active', document.queryCommandState('underline'));
    }

    updateFileName() {
        const displayName = this.isModified ? `${this.fileName} *` : this.fileName;
        this.elements.fileName.textContent = displayName;
    }

    updateStats() {
        const text = this.editor.innerText || this.editor.textContent;
        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        const characters = text.length;
        const lines = text.split('\n').length;
        
        this.elements.wordCount.textContent = `${words.length} words`;
        this.elements.charCount.textContent = `${characters} characters`;
        this.elements.lineCount.textContent = `${lines} line${lines !== 1 ? 's' : ''}`;
    }

    handleKeyboardShortcuts(event) {
        if (event.ctrlKey || event.metaKey) {
            switch (event.key.toLowerCase()) {
                case 'n':
                    event.preventDefault();
                    this.newDocument();
                    break;
                case 'o':
                    event.preventDefault();
                    this.openDocument();
                    break;
                case 's':
                    event.preventDefault();
                    this.saveDocument();
                    break;
                case 'b':
                    event.preventDefault();
                    this.toggleFormat('bold');
                    break;
                case 'i':
                    event.preventDefault();
                    this.toggleFormat('italic');
                    break;
                case 'u':
                    event.preventDefault();
                    this.toggleFormat('underline');
                    break;
            }
        }
    }

    startAutoSave() {
        // Auto-save to localStorage every 30 seconds
        setInterval(() => {
            if (this.isModified) {
                const autoSaveData = {
                    content: this.editor.innerHTML,
                    fileName: this.fileName,
                    timestamp: Date.now()
                };
                
                // Note: In a real application, you might want to save to a server
                // For now, we'll just update the last saved time
                this.elements.lastSaved.textContent = `Auto-saved at ${new Date().toLocaleTimeString()}`;
            }
        }, 30000);
    }

    // Method to get current document content
    getContent() {
        return this.editor.innerHTML;
    }

    // Method to set document content
    setContent(content) {
        this.editor.innerHTML = content;
        this.isModified = true;
        this.updateFileName();
        this.updateStats();
    }
}

// Initialize the WordPad application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const wordPad = new WordPad();
    
    // Make wordPad globally accessible for debugging
    window.wordPad = wordPad;
    
    // Focus the editor on load
    wordPad.editor.focus();
    
    // Set cursor at the end of the initial text
    const range = document.createRange();
    const selection = window.getSelection();
    const firstParagraph = wordPad.editor.querySelector('p');
    
    if (firstParagraph) {
        range.setStart(firstParagraph, firstParagraph.childNodes.length);
        range.setEnd(firstParagraph, firstParagraph.childNodes.length);
        selection.removeAllRanges();
        selection.addRange(range);
    }
});
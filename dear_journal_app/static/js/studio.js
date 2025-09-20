document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('popup');
    const newBtn = document.getElementById('newBtn');
    const createBtn = document.getElementById('createBtn');
    const fileNameInput = document.getElementById('fileNameInput');
    const emojis = document.querySelectorAll('#moodSelector .emoji');
    const fileNameDisplay = document.getElementById('fileName');

    let selectedMood = '';

    // Show popup when New Document is clicked
    newBtn.addEventListener('click', () => {
        popup.classList.add('show');
    });

    // Select mood
    emojis.forEach(emoji => {
        emoji.addEventListener('click', () => {
            emojis.forEach(e => e.classList.remove('selected'));
            emoji.classList.add('selected');
            selectedMood = emoji.dataset.mood;
        });
    });

    // Create button
    createBtn.addEventListener('click', () => {
        const fileName = fileNameInput.value.trim() || 'Untitled Document';
        fileNameDisplay.textContent = fileName;
        popup.classList.remove('show');

        // You can insert mood info if needed
        console.log('Selected mood:', selectedMood);
    });

    // Close popup by clicking outside content
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.classList.remove('show');
        }
    });
});


class ModernWordPad {
    constructor() {
        this.editor = document.getElementById('editor');
        this.fileName = 'Untitled Document';
        this.isModified = false;
        this.currentAlignment = 'left';
        this.zoomLevel = 100;
        this.recentColors = ['#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
        
        this.initializeElements();
        this.setupEventListeners();
        this.updateStats();
        this.startAutoSave();
        this.setupAdvancedFeatures();
    }

    initializeElements() {
        this.elements = {
            fileName: document.getElementById('fileName'),
            wordCount: document.getElementById('wordCount'),
            charCount: document.getElementById('charCount'),
            lineCount: document.getElementById('lineCount'),
            paraCount: document.getElementById('paraCount'),
            lastSaved: document.getElementById('lastSaved'),
            wordCountBadge: document.getElementById('wordCountBadge'),
            zoomLevel: document.getElementById('zoomLevel'),
            
            // File operations
            newBtn: document.getElementById('newBtn'),
            openBtn: document.getElementById('openBtn'),
            saveBtn: document.getElementById('saveBtn'),
            printBtn: document.getElementById('printBtn'),
            fileInput: document.getElementById('fileInput'),
            
            // Edit operations
            undoBtn: document.getElementById('undoBtn'),
            redoBtn: document.getElementById('redoBtn'),
            
            // Formatting
            fontFamily: document.getElementById('fontFamily'),
            fontSize: document.getElementById('fontSize'),
            textColor: document.getElementById('textColor'),
            highlightColor: document.getElementById('highlightColor'),
            
            // Text formatting buttons
            boldBtn: document.getElementById('boldBtn'),
            italicBtn: document.getElementById('italicBtn'),
            underlineBtn: document.getElementById('underlineBtn'),
            strikeBtn: document.getElementById('strikeBtn'),
            
            // Alignment buttons
            alignLeftBtn: document.getElementById('alignLeftBtn'),
            alignCenterBtn: document.getElementById('alignCenterBtn'),
            alignRightBtn: document.getElementById('alignRightBtn'),
            justifyBtn: document.getElementById('justifyBtn'),
            
            // List buttons
            bulletBtn: document.getElementById('bulletBtn'),
            numberBtn: document.getElementById('numberBtn'),
            outdentBtn: document.getElementById('outdentBtn'),
            indentBtn: document.getElementById('indentBtn'),
            
            // Insert buttons
            insertDateBtn: document.getElementById('insertDateBtn'),
            insertTimeBtn: document.getElementById('insertTimeBtn'),
            linkBtn: document.getElementById('linkBtn'),
            imageBtn: document.getElementById('imageBtn'),
            
            // View controls
            zoomOut: document.getElementById('zoomOut'),
            zoomIn: document.getElementById('zoomIn'),
            
            // Tools
            findBtn: document.getElementById('findBtn'),
            clearBtn: document.getElementById('clearBtn'),
            fullscreenBtn: document.getElementById('fullscreenBtn'),
            
            // FAB
            fabBtn: document.getElementById('fabBtn')
        };
    }

    setupEventListeners() {
        // File operations
        this.elements.newBtn?.addEventListener('click', () => this.newDocument());
        this.elements.openBtn?.addEventListener('click', () => this.openDocument());
        this.elements.saveBtn?.addEventListener('click', () => this.saveDocument());
        this.elements.printBtn?.addEventListener('click', () => this.printDocument());
        this.elements.fileInput?.addEventListener('change', (e) => this.handleFileOpen(e));

        // Edit operations
        this.elements.undoBtn?.addEventListener('click', () => this.undo());
        this.elements.redoBtn?.addEventListener('click', () => this.redo());

        // Formatting
        this.elements.fontFamily?.addEventListener('change', () => this.changeFontFamily());
        this.elements.fontSize?.addEventListener('change', () => this.changeFontSize());
        this.elements.textColor?.addEventListener('change', () => this.changeTextColor());
        this.elements.highlightColor?.addEventListener('change', () => this.changeHighlightColor());

        // Text formatting buttons
        this.elements.boldBtn?.addEventListener('click', () => this.toggleFormat('bold'));
        this.elements.italicBtn?.addEventListener('click', () => this.toggleFormat('italic'));
        this.elements.underlineBtn?.addEventListener('click', () => this.toggleFormat('underline'));
        this.elements.strikeBtn?.addEventListener('click', () => this.toggleFormat('strikeThrough'));

        // Alignment buttons
        this.elements.alignLeftBtn?.addEventListener('click', () => this.setAlignment('left'));
        this.elements.alignCenterBtn?.addEventListener('click', () => this.setAlignment('center'));
        this.elements.alignRightBtn?.addEventListener('click', () => this.setAlignment('right'));
        this.elements.justifyBtn?.addEventListener('click', () => this.setAlignment('justify'));

        // List buttons
        this.elements.bulletBtn?.addEventListener('click', () => this.toggleList('insertUnorderedList'));
        this.elements.numberBtn?.addEventListener('click', () => this.toggleList('insertOrderedList'));
        this.elements.outdentBtn?.addEventListener('click', () => this.changeIndent('outdent'));
        this.elements.indentBtn?.addEventListener('click', () => this.changeIndent('indent'));

        // Insert buttons
        this.elements.insertDateBtn?.addEventListener('click', () => this.insertDate());
        this.elements.insertTimeBtn?.addEventListener('click', () => this.insertTime());
        this.elements.linkBtn?.addEventListener('click', () => this.insertLink());
        this.elements.imageBtn?.addEventListener('click', () => this.insertImage());

        // View controls
        this.elements.zoomOut?.addEventListener('click', () => this.zoom(-10));
        this.elements.zoomIn?.addEventListener('click', () => this.zoom(10));

        // Tools
        this.elements.findBtn?.addEventListener('click', () => this.showFindReplace());
        this.elements.clearBtn?.addEventListener('click', () => this.clearDocument());
        this.elements.fullscreenBtn?.addEventListener('click', () => this.toggleFullscreen());

        // FAB
        this.elements.fabBtn?.addEventListener('click', () => this.showQuickActions());

        // Editor events
        this.editor.addEventListener('input', () => this.handleEditorChange());
        this.editor.addEventListener('keyup', () => this.updateStats());
        this.editor.addEventListener('paste', () => {
            setTimeout(() => this.updateStats(), 100);
        });

        // Update formatting button states when cursor moves
        this.editor.addEventListener('mouseup', () => this.updateFormatButtons());
        this.editor.addEventListener('keyup', () => this.updateFormatButtons());

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
    }

    setupAdvancedFeatures() {
        // Keyboard shortcuts
        this.setupKeyboardShortcuts();
        
        // Auto-save functionality
        this.startAutoSave();
        
        // Focus management
        this.setupFocusManagement();
        
        // Placeholder management
        this.setupPlaceholder();
    }

    setupPlaceholder() {
        // Handle placeholder visibility
        const updatePlaceholder = () => {
            const isEmpty = this.editor.innerHTML === '' || 
                          this.editor.innerHTML === '<br>' || 
                          this.editor.innerHTML === '<div><br></div>' ||
                          this.editor.textContent.trim() === '';
            
            if (isEmpty) {
                this.editor.setAttribute('data-placeholder', 'Welcome to DearJournal Studio! Start typing your masterpiece here...');
            } else {
                this.editor.removeAttribute('data-placeholder');
            }
        };

        // Update placeholder on input
        this.editor.addEventListener('input', updatePlaceholder);
        this.editor.addEventListener('keyup', updatePlaceholder);
        this.editor.addEventListener('paste', () => {
            setTimeout(updatePlaceholder, 10);
        });
        
        // Initial placeholder setup
        updatePlaceholder();
    }

    setupKeyboardShortcuts() {
        // Additional keyboard shortcuts can be added here
    }

    setupFocusManagement() {
        // Focus the editor on load
        this.editor.focus();
    }

    handleEditorChange() {
        this.isModified = true;
        this.updateFileName();
        this.updateStats();
    }

    // File Operations
    newDocument() {
        if (this.isModified && !confirm('You have unsaved changes. Are you sure you want to create a new document?')) {
            return;
        }
        
        this.editor.innerHTML = '';
        this.fileName = 'Untitled Document';
        this.isModified = false;
        this.updateFileName();
        this.updateStats();
        this.editor.focus();
        
        // Trigger placeholder update
        this.editor.dispatchEvent(new Event('input'));
    }

    openDocument() {
        if (this.isModified && !confirm('You have unsaved changes. Are you sure you want to open another document?')) {
            return;
        }
        this.elements.fileInput?.click();
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

    printDocument() {
        window.print();
    }

    // Edit Operations
    undo() {
        document.execCommand('undo', false, null);
        this.updateFormatButtons();
        this.editor.focus();
    }

    redo() {
        document.execCommand('redo', false, null);
        this.updateFormatButtons();
        this.editor.focus();
    }

    // Formatting
    changeFontFamily() {
        const fontFamily = this.elements.fontFamily?.value;
        document.execCommand('fontName', false, fontFamily);
        this.editor.focus();
    }

    changeFontSize() {
        const fontSize = this.elements.fontSize?.value;
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
        const color = this.elements.textColor?.value;
        document.execCommand('foreColor', false, color);
        this.editor.focus();
    }

    changeHighlightColor() {
        const color = this.elements.highlightColor?.value;
        document.execCommand('backColor', false, color);
        this.editor.focus();
    }

    toggleFormat(command) {
        document.execCommand(command, false, null);
        this.updateFormatButtons();
        this.editor.focus();
    }

    // Alignment
    setAlignment(alignment) {
        // Remove active class from all alignment buttons
        document.querySelectorAll('.toolbar-btn').forEach(btn => {
            if (btn.id.includes('align') || btn.id.includes('justify')) {
                btn.classList.remove('active');
            }
        });
        
        // Add active class to current button
        const buttonMap = {
            'left': this.elements.alignLeftBtn,
            'center': this.elements.alignCenterBtn,
            'right': this.elements.alignRightBtn,
            'justify': this.elements.justifyBtn
        };
        
        buttonMap[alignment]?.classList.add('active');
        
        // Apply alignment
        const commandMap = {
            'left': 'justifyLeft',
            'center': 'justifyCenter',
            'right': 'justifyRight',
            'justify': 'justifyFull'
        };
        
        document.execCommand(commandMap[alignment], false, null);
        this.currentAlignment = alignment;
        this.editor.focus();
    }

    // Lists and Indentation
    toggleList(command) {
        document.execCommand(command, false, null);
        this.updateFormatButtons();
        this.editor.focus();
    }

    changeIndent(command) {
        document.execCommand(command, false, null);
        this.editor.focus();
    }

    // Insert Operations
    insertDate() {
        const now = new Date();
        const dateString = now.toLocaleDateString();
        document.execCommand('insertText', false, dateString);
        this.editor.focus();
    }

    insertTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        document.execCommand('insertText', false, timeString);
        this.editor.focus();
    }

    insertLink() {
        const url = prompt('Enter URL:');
        if (url) {
            document.execCommand('createLink', false, url);
        }
        this.editor.focus();
    }

    insertImage() {
        const url = prompt('Enter image URL:');
        if (url) {
            document.execCommand('insertImage', false, url);
        }
        this.editor.focus();
    }

    // View Operations
    zoom(delta) {
        this.zoomLevel = Math.max(50, Math.min(200, this.zoomLevel + delta));
        this.editor.style.fontSize = `${14 * (this.zoomLevel / 100)}px`;
        this.elements.zoomLevel.textContent = `${this.zoomLevel}%`;
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    // Tools
    showFindReplace() {
        const searchTerm = prompt('Find:');
        if (searchTerm) {
            const found = window.find(searchTerm);
            if (!found) {
                alert('Text not found');
            }
        }
    }

    clearDocument() {
        if (confirm('Are you sure you want to clear all content?')) {
            this.editor.innerHTML = '';
            this.isModified = true;
            this.updateFileName();
            this.updateStats();
            this.editor.focus();
            
            // Trigger placeholder update
            this.editor.dispatchEvent(new Event('input'));
        }
    }

    showQuickActions() {
        // Implement quick actions menu
        alert('Quick Actions coming soon!');
    }

    // UI Updates
    updateFormatButtons() {
        // Update format button states based on current selection
        this.elements.boldBtn?.classList.toggle('active', document.queryCommandState('bold'));
        this.elements.italicBtn?.classList.toggle('active', document.queryCommandState('italic'));
        this.elements.underlineBtn?.classList.toggle('active', document.queryCommandState('underline'));
        this.elements.strikeBtn?.classList.toggle('active', document.queryCommandState('strikeThrough'));
    }

    updateFileName() {
        const displayName = this.isModified ? `${this.fileName} *` : this.fileName;
        this.elements.fileName.textContent = displayName;
    }

    updateStats() {
        const text = this.editor.innerText || this.editor.textContent || '';
        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        const characters = text.length;
        const lines = text.split('\n').length;
        const paragraphs = this.editor.querySelectorAll('p, div').length || 1;
        
        this.elements.wordCount.textContent = `${words.length} words`;
        this.elements.charCount.textContent = `${characters} characters`;
        this.elements.lineCount.textContent = `${lines} line${lines !== 1 ? 's' : ''}`;
        this.elements.paraCount.textContent = `${paragraphs} paragraph${paragraphs !== 1 ? 's' : ''}`;
        this.elements.wordCountBadge.textContent = `${words.length} words`;
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
                case 'p':
                    event.preventDefault();
                    this.printDocument();
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
                case 'z':
                    if (event.shiftKey) {
                        event.preventDefault();
                        this.redo();
                    } else {
                        event.preventDefault();
                        this.undo();
                    }
                    break;
                case 'f':
                    event.preventDefault();
                    this.showFindReplace();
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
    const wordPad = new ModernWordPad();
    
    // Make wordPad globally accessible for debugging
    window.wordPad = wordPad;
    
    // Focus the editor on load
    wordPad.editor.focus();
    
    // Set cursor at the beginning for empty editor
    const range = document.createRange();
    const selection = window.getSelection();
    
    if (wordPad.editor.childNodes.length === 0) {
        wordPad.editor.focus();
    } else {
        range.setStart(wordPad.editor, 0);
        range.setEnd(wordPad.editor, 0);
        selection.removeAllRanges();
        selection.addRange(range);
    }
});

// Login timeout functionality (if needed)
let warningTime = 4 * 60 * 1000; // 4 minutes
let logoutTime = 5 * 60 * 1000;  // 5 minutes

let warningTimer, logoutTimer;

function startTimers() {
    clearTimeout(warningTimer);
    clearTimeout(logoutTimer);

    // Show popup after 4 min
    warningTimer = setTimeout(showWarning, warningTime);

    // Auto logout after 5 min
    logoutTimer = setTimeout(autoLogout, logoutTime);
}

function showWarning() {
    if (confirm("You will be logged out soon. Do you want to stay signed in?")) {
        // Send a request to refresh session - update URL as needed
        fetch(window.location.href, {method: "GET"}).then(() => {
            startTimers(); // Reset timers
        });
    }
}

function autoLogout() {
    // Update logout URL as needed
    window.location.href = "/logout";
}

// Reset timer whenever user interacts
document.addEventListener("mousemove", startTimers);
document.addEventListener("keypress", startTimers);

// Start the timers when page loads
startTimers();

const popup = document.getElementById('popup');
const createBtn = document.getElementById('createBtn');
const fileNameInput = document.getElementById('fileNameInput');
const moodEmojis = document.querySelectorAll('.emoji');
let selectedMood = null;

// Emoji selection
moodEmojis.forEach(emoji => {
    emoji.addEventListener('click', () => {
        moodEmojis.forEach(e => e.classList.remove('selected'));
        emoji.classList.add('selected');
        selectedMood = emoji.dataset.mood;
    });
});

// On create
createBtn.addEventListener('click', () => {
    const fileName = fileNameInput.value.trim();
    if(!fileName || !selectedMood){
        alert("Please enter a file name and select a mood!");
        return;
    }

    // Set document title
    document.title = fileName + " - DearJournal Studio";

    // Set file name display
    document.getElementById('fileName').textContent = fileName + " " + selectedMood;

    // Hide popup
    popup.style.display = 'none';

    // Start timer (example: 5 minutes)
    startTimer(5*60); // in seconds
});

// Timer function
function startTimer(duration) {
    let timer = duration, minutes, seconds;
    const timerDisplay = document.createElement('div');
    timerDisplay.id = "timerDisplay";
    timerDisplay.style.position = 'fixed';
    timerDisplay.style.top = '10px';
    timerDisplay.style.right = '20px';
    timerDisplay.style.fontSize = '1.2rem';
    timerDisplay.style.background = '#eee';
    timerDisplay.style.padding = '5px 10px';
    timerDisplay.style.borderRadius = '5px';
    document.body.appendChild(timerDisplay);

    const countdown = setInterval(() => {
        minutes = Math.floor(timer / 60);
        seconds = timer % 60;

        timerDisplay.textContent = `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;

        if (--timer < 0) {
            clearInterval(countdown);
            alert("Well done! Time's up.");
            window.location.href = "/"; // redirect to homepage or dashboard
        }
    }, 1000);
}

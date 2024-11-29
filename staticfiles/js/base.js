class SplitText {
    constructor(element, options = {}) {
        this.element = typeof element === 'string' ? document.querySelector(element) : element;
        this.options = {
            type: options.type || 'words', // 'words', 'chars', 'lines'
            wordDelimiter: options.wordDelimiter || ' ',
            linesClass: options.linesClass || 'split-line',
            wordsClass: options.wordsClass || 'split-word',
            charsClass: options.charsClass || 'split-char'
        };
        
        this.originalText = this.element.innerHTML;
        this.words = [];
        this.chars = [];
        this.lines = [];
        
        this.split();
    }
    
    split() {
        // Reset content
        this.element.innerHTML = this.originalText;
        
        // Split into words first
        const words = this.element.textContent.split(this.options.wordDelimiter);
        let html = '';
        
        words.forEach((word, i) => {
            const wordSpan = document.createElement('span');
            wordSpan.className = this.options.wordsClass;
            wordSpan.dataset.wordIndex = i;
            
            if (this.options.type === 'chars') {
                // Split word into characters
                const chars = word.split('');
                chars.forEach((char, j) => {
                    const charSpan = document.createElement('span');
                    charSpan.className = this.options.charsClass;
                    charSpan.dataset.charIndex = this.chars.length;
                    charSpan.textContent = char;
                    
                    this.chars.push(charSpan);
                    wordSpan.appendChild(charSpan);
                });
            } else {
                wordSpan.textContent = word;
            }
            
            this.words.push(wordSpan);
            html += wordSpan.outerHTML + (i < words.length - 1 ? ' ' : '');
        });
        
        this.element.innerHTML = html;
        
        if (this.options.type === 'lines') {
            this.splitLines();
        }
    }
    
    splitLines() {
        const words = Array.from(this.element.querySelectorAll(`.${this.options.wordsClass}`));
        let currentLine = [];
        let currentTop = words[0]?.getBoundingClientRect().top;
        
        words.forEach((word) => {
            const { top } = word.getBoundingClientRect();
            
            if (top !== currentTop && currentLine.length) {
                // New line detected
           



     const lineDiv = this.createLineWrapper(currentLine);
                this.lines.push(lineDiv);
                currentLine = [];
                currentTop = top;
            }
            
            currentLine.push(word);
        });
        
        // Handle last line
        if (currentLine.length) {
            const lineDiv = this.createLineWrapper(currentLine);
            this.lines.push(lineDiv);
        }
    }
    
    createLineWrapper(words) {
        const lineDiv = document.creppateElement('div');
        lineDiv.className = this.options.linesClass;
        lineDiv.dataset.lineIndex = this.lines.length;
        
        words.forEach((word) => {
            const clone = word.cloneNode(true);
            lineDiv.appendChild(clone);
            if (word !== words[words.length - 1]) {
                lineDiv.appendChild(document.createTextNode(' '));
            }
        });
        
        words[0].parentNode.insertBefore(lineDiv, words[0]);
        words.forEach(word => word.remove());
        
        return lineDiv;
    }
    
    revert() {
        this.element.innerHTML = this.originalText;
        this.words = [];
        this.chars = [];
        this.lines = [];
    }
    
    // Getters pour accéder aux éléments splittés
    getChars() {
        return this.chars;
    }
    
    getWords() {
        return this.words;
    }
    
    getLines() {
        return this.lines;
    }
}
class App {
    constructor() {
        this.notes = [];

        this.$form = document.querySelector('#form');
        this.$noteTitle = document.querySelector('#note-title');
        this.$noteText = document.querySelector('#note-text');
        this.$formButtons = document.querySelector('#form-buttons');
        this.$notes = document.querySelector('#notes');
        this.$formCloseButton = document.querySelector('#form-close-button');

        this.addEventListeners();
    }

    addEventListeners() {
        document.body.addEventListener('click', event => {
            this.handleFormClick(event);
        });

        this.$form.addEventListener('submit', event => {
            event.preventDefault();
            
            const title = this.$noteTitle.value;
            const text = this.$noteText.value;
            const hasNotes = title || text;
            
            if (hasNotes) {
                this.addNote({ title, text });
            }
        });

        this.$formCloseButton.addEventListener('click', event => {
            event.stopPropagation();
            this.closeForm();
        });
    }

    handleFormClick(event) {
        const isFormClicked = this.$form.contains(event.target);
        const title = this.$noteTitle.value;
        const text = this.$noteText.value;
        const hasNotes = title || text;

        if (isFormClicked) {
            this.openForm();
        } else if (hasNotes) {
            this.addNote({ title, text });
        } else {
            this.closeForm();
        }
    }

    openForm() {
        this.$noteTitle.style.display = 'block';
        this.$formButtons.style.display = 'block';
    }

    closeForm() {
        this.$noteTitle.style.display = 'none';
        this.$formButtons.style.display = 'none';
        this.$noteTitle.value = '';
        this.$noteText.value = '';
    }

    addNote({ title, text }) {
        const newNote = {
            title,
            text,
            color: '#202124',
            id: this.notes.length > 0 ? this.notes[this.notes.length - 1].id + 1 : 1
        };
        this.notes = [...this.notes, newNote];
        this.displayNotes();
        this.closeForm();
    }

    displayNotes() {
        this.$notes.innerHTML = this.notes.map(note => `
            <div style="background: ${note.color};" class="note">
                <div class="${note.title && 'note-title'}">${note.title}</div>
                <div class="note-text">${note.text}</div>
                <div class="toolbar-container">
                    <div class="toolbar">
                        <i class="fa-solid fa-trash toolbar-delete"></i>
                        <i class="fa-solid fa-palette toolbar-color"></i>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

new App();
export default class NotesView {
    constructor(root, { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}) {
        this.root = root;
        this.onNoteSelect = onNoteSelect;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteDelete = onNoteDelete;
        this.root.innerHTML = `
            <div class="notes__sidebar">
                <button class="notes__add" type="button">Add Note</button>
                <div class="notes__list"></div>
            </div>
            <div class="notes__preview">
           
                <input class="notes__title" type="text" placeholder="New Note...">
                <textarea class="notes__body" placeholder="Take Note..."></textarea>
            </div>
        `;
 // <p id="disclaimer">Please ensure to Refresh the page and save your Notes once you are done!</p>
        const btnAddNote = this.root.querySelector(".notes__add");
        const inpTitle = this.root.querySelector(".notes__title");
        const inpBody = this.root.querySelector(".notes__body");

        btnAddNote.addEventListener("click", () => {
            this.onNoteAdd();
        });

        [inpTitle, inpBody].forEach(inputField => {
            inputField.addEventListener("blur", () => {
                const updatedTitle = inpTitle.value.trim();
                const updatedBody = inpBody.value.trim();

                this.onNoteEdit(updatedTitle, updatedBody);
            });
        });

        this.updateNotePreviewVisibility(false);
    }

    _createListItemHTML(id, title, body, updated) {
        const MAX_BODY_LENGTH = 60;

        return `
            <div class="notes__list-item" data-note-id="${id}">
                <div class="notes__small-title">${title}</div>
                <div class="notes__small-body">
                    ${body.substring(0, MAX_BODY_LENGTH)}
                    ${body.length > MAX_BODY_LENGTH ? "..." : ""}
                </div>
                <div class="notes__small-updated">
                    ${updated.toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" })}
                </div>
            </div>
        `;
    }

    updateNoteList(notes) {
        const notesListContainer = this.root.querySelector(".notes__list");

        // Empty list
        notesListContainer.innerHTML = "";

        for (const note of notes) {
            const html = this._createListItemHTML(note.id, note.title, note.body, new Date(note.updated));

            notesListContainer.insertAdjacentHTML("beforeend", html);
        }

        // Add select/delete events for each list item
        notesListContainer.querySelectorAll(".notes__list-item").forEach(noteListItem => {
            noteListItem.addEventListener("click", () => {
                this.onNoteSelect(noteListItem.dataset.noteId);
            });

            noteListItem.addEventListener("dblclick", () => {
                const doDelete = confirm("Are you sure you want to delete this note?");

                if (doDelete) {
                    this.onNoteDelete(noteListItem.dataset.noteId);
                }
            });
        });
    }

    updateActiveNote(note) {
        this.root.querySelector(".notes__title").value = note.title;
        this.root.querySelector(".notes__body").value = note.body;

        
        this.root.querySelectorAll(".notes__list-item").forEach(noteListItem => {
            noteListItem.classList.remove("notes__list-item--selected");
        });

        this.root.querySelector(`.notes__list-item[data-note-id="${note.id}"]`).classList.add("notes__list-item--selected");

        //save notes
        const btnSaveNote = document.getElementById("save__btn");
        btnSaveNote.removeEventListener("click", this.saveNoteListener);
            this.saveNoteListener = () => {
                if(note.title == "" || note.body == ""){
                    swal('','Empty notes cannot be saved', 'error')
                } else{
                    console.log("Title : " + note.title);
                    console.log("Body : " + note.body);
                    var notesTitle = note.title;
                    var notesBody = note.body;
                    var lines = notesBody.split('\n');
                    var docDefinition = {
                        content: [
                            { text: notesTitle, style: 'header' },
                            notesBody
                        ],
                        styles: {
                            header: {
                                fontSize: 22,
                                bold: true
                            },
                            notesBody: {
                                fontSize: 16,
                                lineHeight:1.5
                            }
                        }
                    };
                    pdfMake.createPdf(docDefinition).download(notesTitle+'.pdf');
        
                    swal('','Your pdf is saved successfully!', 'success')
                }    
        }
        btnSaveNote.addEventListener("click", this.saveNoteListener);

        //copy notes
        const copyButton = document.getElementById('copy__btn');
        copyButton.removeEventListener('click',this.copyNoteListener);
        this.copyNoteListener = () =>{
            const combinedText = `Title : ${note.title}\nBody : ${note.body}`;
            navigator.clipboard.writeText(combinedText).then(() => {
                console.log("Combined Input and Textarea value copied to clipboard!");
            });
        }
        copyButton.addEventListener("click", this.copyNoteListener);

        //share notes
        const shareButton = document.getElementById('share__btn');
        shareButton.removeEventListener('click', this.shareNoteListener);
        this.shareNoteListener = () =>{
            if(navigator.share){
                const combinedText = `Title : ${note.title}\nBody : ${note.body}`;
                navigator.share({
                    title: note.title,
                    text: combinedText,
                    url: `\n\n ${window.location.href}`
                  }).then(() => {
                    console.log("Combined Input and Textarea value shared!");
                  }).catch(error => {
                    console.error("Sharing failed:", error);
                  });
            } else{
                console.error("Web Share API not supported in your browser.");
            }
        }
        shareButton.addEventListener('click', this.shareNoteListener);   
    }

    updateNotePreviewVisibility(visible) {
        this.root.querySelector(".notes__preview").style.visibility = visible ? "visible" : "hidden";
    }
}



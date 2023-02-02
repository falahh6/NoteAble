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
                    // swal('','Empty notes cannot be saved', 'error')
                 const errorToast =  new Toast({   message: 'Empty Notes Can\'t be Saved',   type: 'danger', });
                 setTimeout(()=>{
                    errorToast._hide();
                 })
                } else{
                    console.log("Title : " + note.title);
                    console.log("Body : " + note.body);
                    var notesTitle = note.title;
                    var notesBody = note.body;
                    var lines = notesBody.split('\n');
                    var docDefinition = {
                        content: [
                            { 
                                text: notesTitle, 
                                style: 'header' ,
                                fontSize: 40
                            },
                            notesBody,
                            {
                                image : 'data:image/png;base64,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',
                                width : 120
                            }
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
        
                    // swal('','Your pdf is saved successfully!', 'success')
                    new Toast({   message: 'Notes Saved Successfully',   type: 'success', duration: 5000 });
                    
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



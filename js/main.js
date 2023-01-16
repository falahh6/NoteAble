import App from "./App.js";
const root = document.getElementById("app");
const app = new App(root);
const sidebar = document.querySelector('.notes__sidebar');

const hamburger = document.querySelector('.hamburger');
const close = document.querySelector('.close');
hamburger.addEventListener('click', () =>{
    hamburger.classList.toggle('is-active');
    close.classList.toggle('is-active');
    sidebar.classList.toggle('is-active');
})
close.addEventListener('click', () =>{
    hamburger.classList.toggle('is-active');
    close.classList.toggle('is-active');
    sidebar.classList.toggle('is-active');
})
const notesAddBtn = document.querySelector('.notes__add');
notesAddBtn.addEventListener('click',()=>{
    hamburger.classList.toggle('is-active');
    close.classList.toggle('is-active');
    sidebar.classList.remove('is-active');
})


var notesLists = document.querySelectorAll('.notes__list-item');
notesLists.forEach(notes => {
    notes.addEventListener('click', ()=>{
        if(notes.classList.contains('notes__list-item--selected')){
            var notesTitle =  notes.childNodes[1].innerText;
            var notesBody = document.getElementsByClassName('notes__body').value;
            // console.log(notesBody);
            var notesBody =  notes.childNodes[3].innerText;
            console.log(notesTitle, notesBody);
            var saveBtn = document.getElementById('save__btn');
            
            var saveBtn = document.getElementById('save__btn');
            saveBtn.addEventListener('click',()=>{
                var lines = notesBody.split('\n');
                var docDefinition = {
                    content: [
                        { text: notesTitle, style: 'header' },
                        { text: lines, style: 'notesBody' }
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
                swal('Your pdf is saved successfully!');
            });            
            console.log(saveBtn);
        }
    })
});

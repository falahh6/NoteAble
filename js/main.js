
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

// const noteList = document.querySelectorAll('.notes__list-item');
// noteList.forEach( note => { 
//     note.addEventListener('click',()=>{
//         hamburger.classList.toggle('is-active');
//         close.classList.toggle('is-active');
//         sidebar.classList.remove('is-active');
//     })
// });


// Save the notes 
// import jsPDF from "jspdf";
var notesTitle = document.querySelector('.notes__title').value;
var notesBody = document.querySelector('.notes__body').value;

var doc = new jsPDF();
doc.setFont('Times');
doc.setFontSize(32);
doc.setFontType('bold');
doc.text(20,20,notesTitle);

doc.setFont('helvetica');
doc.setFontSize(18);
doc.setFontType('normal');
doc.text(20,40,notesBody);

// doc.addImage(dataURL, 'PNG', 300, 670, 120, 70);
var saveBtn = document.getElementById('save__btn');
saveBtn.addEventListener('click',()=>{
    doc.save('your-notes.pdf');
    swal('Your pdf is saved successfully!');
})

var notesLists = document.querySelectorAll('.notes__list-item');
console.log(notesLists);

notesLists.forEach(notes => {
    notes.addEventListener('click', ()=>{
        console.log(notes);
    })
});